const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Helper: Generate a JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2h' });
};

// ==========================================
// 1. SIGNUP API (POST /api/auth/signup)
// ==========================================
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All inputs are required" });
        }

        const emailTaken = await User.findOne({ email });
        if (emailTaken) {
            return res.status(400).json({ message: "This email is already in use" });
        }

        // Cryptography: Secure password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User identity created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Signup process fail", error: error.message });
    }
};

// ==========================================
// 2. LOGIN API (POST /api/auth/login)
// ==========================================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter your email and password" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials matching parameters" });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(400).json({ message: "Invalid credentials matching parameters" });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: "Authentication successful",
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: "Login execution error", error: error.message });
    }
};

// ==========================================
// 3. FORGOT PASSWORD (POST /api/auth/forgot-password)
// ==========================================
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No account found with that email address" });
        }

        // Generate a random, temporary reset token using Node's crypto library
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Hash it and save it to the user database record (expires in 10 minutes)
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes from now
        await user.save();

        // Configure Nodemailer to mail the token link out
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        });

        const resetUrl = `http://localhost:5000/api/auth/reset-password/${resetToken}`;
        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Raritone - Password Reset Request',
            text: `You are receiving this because you requested a password reset. Please make a POST request to:\n\n${resetUrl}\n\nThis link expires in 10 minutes.`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Password reset link sent to your email" });

    } catch (error) {
        res.status(500).json({ message: "Email system error", error: error.message });
    }
};

// ==========================================
// 4. RESET PASSWORD (POST /api/auth/reset-password/:token)
// ==========================================
exports.resetPassword = async (req, res) => {
    try {
        // Re-hash the incoming token from the URL to match the one stored in our DB
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        // Check if token matches and hasn't expired yet
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() } // $gt means "Greater Than Now"
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        // Hash and save the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        
        // Wipe the reset fields clean so the token cannot be reused
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({ message: "Password updated successfully! You can now log in." });

    } catch (error) {
        res.status(500).json({ message: "Reset execution error", error: error.message });
    }
};

// ==========================================
// 5. LOGOUT API (POST /api/auth/logout)
// ==========================================
exports.logout = async (req, res) => {
    // In stateless JWT architectures, the frontend logs out by destroying its stored token copy.
    // On the backend, we acknowledge the action cleanly to clear headers.
    res.status(200).json({ message: "Logout successful. Clear token from your client storage." });
};