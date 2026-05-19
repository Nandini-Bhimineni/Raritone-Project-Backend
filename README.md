# Raritone E-Commerce Backend API 🚀

A high-performance, secure, and production-ready RESTful API backend for the Raritone platform built using Node.js, Express.js, and MongoDB. This project follows a modular MVC architecture with separate feature modules for authentication, products, and user management.

---

## 📁 Core Architecture

Raritone-Backend/
├── config/
├── controllers/
├── models/
├── routes/
├── middleware/
├── uploads/
├── server.js
├── .env
└── package.json

---

## 🔐 Authentication Module

- POST /api/auth/signup - Register user
- POST /api/auth/login - Login & JWT token generation
- POST /api/auth/logout - Logout user
- POST /api/auth/forgot-password - Send reset email
- POST /api/auth/reset-password/:token - Reset password

---

## 🛒 Product Management Module

### Features:
- Add Products
- Update Products
- Delete Products
- View Products
- Search Products
- Filter by category & price
- Pagination & Sorting

### APIs:
- POST /api/products
- GET /api/products
- GET /api/products/:id
- PUT /api/products/:id
- DELETE /api/products/:id
- GET /api/products/search

---

## 📷 Image Upload

- Multer-based upload system
- Stored in `/uploads`
- Supports JPG, PNG, JPEG
- Access images via:
  http://localhost:5000/uploads/<filename>

---

## 🧠 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Multer

---

## ⚙️ Setup

```bash
npm install
npm run dev