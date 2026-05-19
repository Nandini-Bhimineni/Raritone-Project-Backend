require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect Database
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Mount Module Endpoints (Matches specs requirements prefix: /api/auth)
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Auth Server operating on port ${PORT}`));