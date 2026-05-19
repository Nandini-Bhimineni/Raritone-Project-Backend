const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access Denied. Authorization headers missing" });
        }

        const token = authHeader.split(" ")[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = verified; // Pass decoded user ID data payload along to the next handle
        next();
    } catch (error) {
        res.status(401).json({ message: "Token execution failed: Session has expired or is invalid" });
    }
};