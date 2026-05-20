# Raritone Backend API

A scalable and modular **Node.js + Express + MongoDB** backend system built for the Raritone platform.  
It includes Authentication, Product Management, Wishlist Management, Wardrobe Management, and User Profile System with JWT security and image upload support.

---

# 📁 Module Ownership

## 🔐 Authentication Module

Developed by:

- Bharath Kumar
- Vishnu Vardhan Reddy

---

## 🛒 Product Module

Developed by:

- Nandini Bhimineni
- Meka Hrishi Teja Chowdary

---

## ❤️ Wishlist Module

Developed by:

- Vishnu Vardhan Reddy
- Bharath Kumar

---

## 👕 Wardrobe Module

Developed by:

- Nainisha
- Vagdevi

---

## 👤 Profile Module

Developed by:

- Vagdevi Malineni
- Nainisha Bandari

---

## 🔗 Final Testing, Integration, Relationships & Database Structure

Handled by:

- Nandini Bhimineni

---

# 📁 Project Structure

```text
Raritone-Backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── wishlistController.js
│   ├── wardrobeController.js
│   └── profileController.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Wishlist.js
│   └── Wardrobe.js
│
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── wishlistRoutes.js
│   ├── wardrobeRoutes.js
│   └── profileRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
│
├── uploads/
│
├── server.js
├── .env
├── package.json
└── README.md
```

---

# ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Multer
- dotenv
- CORS
- Nodemailer

---

# 🔐 Authentication Module

## Features

- User Signup
- User Login
- JWT Authentication
- Forgot Password
- Reset Password
- Logout

## APIs

```http
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password/:token
```

---

# 🛒 Product Module

## Features

- Add Products
- Update Products
- Delete Products
- Search & Filter Products
- Product Image Upload

## APIs

```http
POST /api/products
GET /api/products
GET /api/products/:id
PUT /api/products/:id
DELETE /api/products/:id
GET /api/products/search
```

---

# ❤️ Wishlist Module

## Features

- Add Product to Wishlist
- Get Wishlist Products
- Remove Product from Wishlist
- Duplicate Wishlist Prevention
- Product Relationship Handling

## APIs

```http
POST /api/wishlist/add
GET /api/wishlist?userId=<id>
DELETE /api/wishlist/remove/:productId
```

---

# 👕 Wardrobe Module

## Features

- Add Clothing Item
- Get Wardrobe Items
- Delete Wardrobe Item
- User-Based Wardrobe Structure

## APIs

```http
POST /api/wardrobe/add
GET /api/wardrobe
DELETE /api/wardrobe/:id
```

---

# 👤 Profile Module

## Features

- View Profile
- Update Profile
- Upload Avatar
- Manage Preferences

## APIs

```http
GET /api/profile
PUT /api/profile/update
POST /api/profile/avatar
PUT /api/profile/preferences
```

---

# 📷 File Upload System

- Multer-based image upload system
- Uploads stored in `/uploads`
- Supports JPG, JPEG, PNG

Access uploaded images using:

```bash
http://localhost:5000/uploads/<filename>
```

---

# 🔐 Authorization

Protected routes require:

```bash
Authorization: Bearer <token>
```

---

# 🗄️ Database Relationships

The project implements MongoDB relationships using ObjectId references.

## Relationships Used

- User → Wardrobe
- User → Wishlist
- Wishlist → Product

## Mongoose Populate

Used Mongoose `populate()` for referenced collection data retrieval.

Example:

```js
.populate("products")
```

---

# ⚙️ Setup Instructions

## Install dependencies

```bash
npm install
```

## Run server

```bash
npm run dev
```

---

# 🌐 Environment Variables

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

---

# 🚀 Server Output

```bash
MongoDB Connected
Server running on port 5000
```

---

# 📌 Features Summary

- ✔ Authentication System
- ✔ Product Management System
- ✔ Wishlist Management System
- ✔ Wardrobe Management System
- ✔ Profile Management System
- ✔ JWT Security
- ✔ Image Upload Support
- ✔ MongoDB Relationships
- ✔ Mongoose Populate()
- ✔ RESTful APIs
- ✔ Modular Architecture
- ✔ Team-based GitHub Collaboration

---

# ✅ Today's Work Completed

- Merged Wishlist Module into final-main
- Merged Wardrobe Module into final-main
- Completed Final Backend Integration
- Implemented MongoDB Relationships
- Verified ObjectId References
- Implemented Mongoose Populate()
- Tested APIs using Postman
- Connected all routes in `server.js`
- Resolved merge conflicts
- Completed integration testing

---

# 🔮 Future Improvements

- Email Verification
- Cloudinary Integration
- Role-Based Access Control
- Swagger API Documentation
- Production Deployment (Render / AWS)

---

# 👨‍💻 Authors

- Nandini Bhimineni
- Bharath Kumar
- Vishnu Vardhan Reddy
- Meka Hrishi Teja Chowdary
- Vagdevi Malineni
- Nainisha Bandari
