# Raritone E-Commerce Backend API 🚀

A high-performance, secure, and production-ready RESTful API backend for the Raritone platform built using Node.js, Express.js, and MongoDB. This project follows a strict Model-View-Controller (MVC) architecture pattern and features isolated modular workflows for seamless team collaboration.

---

## 📁 Core Workspace Architecture

The repository is structured around a clear separation of concerns, ensuring different system modules can integrate cleanly without file system overlaps:

Raritone-Backend/
├── config/             # Database connection setup
│   └── db.js
├── middleware/         # Security gatekeepers & token verification
│   └── authMiddleware.js
├── models/             # Mongoose schemas & data blueprints
│   └── User.js
├── controllers/        # Functional core brains & logic execution
│   └── authController.js
├── routes/             # API endpoint URI path mappings
│   └── authRoutes.js
├── .env                # Private environmental configurations (Hidden/Ignored)
├── .gitignore          # Version control security exclusion rules
├── package.json        # Project dependency manifests
└── server.js           # Grand central integration station

---

## 🔐 Authentication Module

Handles user security layers, credential verification, and stateless secure session allocation.

- POST /api/auth/signup - Registers a new user
- POST /api/auth/login - Issues JWT token
- POST /api/auth/logout - Ends session
- POST /api/auth/forgot-password - Sends reset email
- POST /api/auth/reset-password/:token - Resets password

---

## 📄 Documentation
User Profile System Readme:
- See attached PDF in repository files