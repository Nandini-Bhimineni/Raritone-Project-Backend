# Raritone Backend API

A scalable and modular **Node.js + Express + MongoDB** backend system built for the Raritone platform.  
It includes Authentication, Product Management, Wishlist Management, Wardrobe Management, Profile System, Cart System, Order Management, Measurements, Google OAuth Authentication, RBAC Security, JWT-based Authorization, and Image Upload Support.

---

# 📁 Module Ownership

## 🔐 Authentication & Security Module

Developed by:

- Vagdevi Malineni
- Bharath Kumar
- Vishnu Vardhan Reddy

Features Added:

- JWT Authentication
- Access Token + Refresh Token
- RBAC (ADMIN / SUPER_ADMIN)
- Google OAuth Backend Integration
- Helmet Security
- Rate Limiting
- Protected APIs

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

## 🛍️ Cart Module

Developed by:

- Nandini Bhimineni

---

## 📦 Order Module

Developed by:

- Nandini Bhimineni
- Meka Hrishi Teja Chowdary

---

## 📏 Measurement Module

Developed by:

- Nandini Bhimineni

---

## 🧠 Try-On Module

Developed by:

- Meka Hrishi Teja Chowdary
- Nandini Bhimineni
- Vishnu Vardhan Reddy

---

## ☁️ Upload, Cloud & Scalability Research

Developed by:

- Nandini Bhimineni

Research Areas:

- AWS S3
- Redis
- Docker
- Load Balancing
- Logging & Monitoring
- Sharp Image Optimization
- WebP Conversion
- Compression Planning

---

## 🔗 Final Testing, Integration, Relationships & Database Structure

Handled by:

- Nandini Bhimineni

---

# 📁 Updated Project Structure

```text
Raritone-Backend/
│
├── config/
│   ├── db.js
│   └── cloudinary.js
│
├── controllers/
│   ├── authController.js
│   ├── googleAuthController.js
│   ├── productController.js
│   ├── wishlistController.js
│   ├── wardrobeController.js
│   ├── profileController.js
│   ├── cartController.js
│   ├── orderController.js
│   ├── measurementController.js
│   ├── tryOnController.js
│   └── imageController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── uploadMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Wishlist.js
│   ├── Wardrobe.js
│   ├── Cart.js
│   ├── Order.js
│   └── Measurement.js
│
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── wishlistRoutes.js
│   ├── wardrobeRoutes.js
│   ├── profileRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   ├── measurementRoutes.js
│   ├── tryOnRoutes.js
│   └── imageRoutes.js
│
├── utils/
│   └── generateToken.js
│
├── uploads/
│
├── app.js
├── server.js
├── .env
├── .gitignore
├── package.json
└── README.md


---

⚙️ Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Google OAuth

bcryptjs

Multer

Cloudinary

dotenv

Helmet

express-rate-limit

CORS

Nodemailer



---

🔐 Authentication & Security Module

Features

User Signup

User Login

JWT Authentication

Access Token + Refresh Token

Forgot Password

Reset Password

Logout

Google OAuth Login

Role-Based Access Control

Helmet Security

Rate Limiting

Protected APIs


APIs

POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password/:token
POST /api/auth/google


---

🛒 Product Module

Features

Add Products

Update Products

Delete Products

Search & Filter Products

Product Image Upload

Admin Route Protection


APIs

POST /api/products
GET /api/products
GET /api/products/:id
PUT /api/products/:id
DELETE /api/products/:id
GET /api/products/search


---

❤️ Wishlist Module

Features

Add Product to Wishlist

Get Wishlist Products

Remove Product from Wishlist

Duplicate Wishlist Prevention

Product Relationship Handling


APIs

POST /api/wishlist/add
GET /api/wishlist
DELETE /api/wishlist/remove/:productId


---

👕 Wardrobe Module

Features

Add Clothing Item

Get Wardrobe Items

Delete Wardrobe Item

User-Based Wardrobe Structure


APIs

POST /api/wardrobe/add
GET /api/wardrobe
DELETE /api/wardrobe/:id


---

👤 Profile Module

Features

View Profile

Update Profile

Upload Avatar

Manage Preferences


APIs

GET /api/profile
PUT /api/profile/update
POST /api/profile/avatar
PUT /api/profile/preferences


---

🛍️ Cart Module

Features

Add to Cart

Get User Cart

Remove Cart Items

Protected Cart APIs


APIs

POST /api/cart
GET /api/cart
DELETE /api/cart/:productId


---

📦 Order Module

Features

Create Order

Get Orders

Update Order Status

Delete Order

Protected Order APIs


APIs

POST /api/orders
GET /api/orders
GET /api/orders/:id
PUT /api/orders/:id
DELETE /api/orders/:id


---

📏 Measurement Module

Features

Save Measurements

Get Measurements

Delete Measurements

User-based Measurement Storage


APIs

POST /api/measurements
GET /api/measurements
DELETE /api/measurements


---

🧠 Try-On Module

Features

Virtual Try-On System

Outfit Preview Handling

User Image Processing

AI-ready Try-On Structure


APIs

POST /api/tryOnRoutes
GET /api/tryOnRoutes


---

📷 File Upload System

Multer-based image upload system

Uploads stored in /uploads

Supports JPG, JPEG, PNG, WEBP

Cloudinary-ready upload structure


Access uploaded images using:

http://localhost:5000/uploads/<filename>


---

🔐 Authorization & RBAC

Protected routes require:

Authorization: Bearer <accessToken>

RBAC Roles:

USER

ADMIN

SUPER_ADMIN


Admin-only APIs:

Product Creation

Product Update

Product Delete



---

🗄️ Database Relationships

The project implements MongoDB relationships using ObjectId references.

Relationships Used

User → Wardrobe

User → Wishlist

Wishlist → Product

User → Cart

User → Orders

User → Measurements


Mongoose Populate

Used Mongoose populate() for referenced collection data retrieval.

Example:

.populate("products")


---

⚙️ Setup Instructions

Install dependencies

npm install

Run server

npm run dev


---

🌐 Environment Variables

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
GOOGLE_CLIENT_ID=your_google_client_id
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


---

🚀 Server Output

MongoDB Connected
Server running on port 5000


---

📌 Features Summary

✔ Authentication System

✔ JWT Security

✔ Access + Refresh Tokens

✔ Google OAuth Backend Integration

✔ RBAC Security

✔ Product Management System

✔ Wishlist Management System

✔ Wardrobe Management System

✔ Profile Management System

✔ Cart Management System

✔ Order Management System

✔ Measurements Management System

✔ Try-On Module

✔ Image Upload Support

✔ MongoDB Relationships

✔ Mongoose Populate()

✔ RESTful APIs

✔ Modular Architecture

✔ Team-based GitHub Collaboration

✔ Helmet Security

✔ Rate Limiting

✔ Protected APIs



---

✅ Today's Work Completed

Merged Wishlist Module into final-main

Merged Wardrobe Module into final-main

Completed Final Backend Integration

Implemented MongoDB Relationships

Verified ObjectId References

Implemented Mongoose Populate()

Tested APIs using Postman

Connected all routes in server.js

Resolved merge conflicts

Completed integration testing

Implemented RBAC Security

Added Access & Refresh Token System

Added Helmet Security Middleware

Added Rate Limiting

Protected Product APIs

Implemented Google OAuth Backend Integration



---

🔮 Future Improvements

Email Verification

Cloudinary Full Integration

AWS S3 Storage

Redis Caching

Docker Deployment

Swagger API Documentation

Production Deployment (Render / AWS)

AI Try-On Optimization

Monitoring & Logging Systems



---

🌿 Final Branch

final-main


---

👨‍💻 Authors

Nandini Bhimineni

Bharath Kumar

Vishnu Vardhan Reddy

Meka Hrishi Teja Chowdary

Vagdevi Malineni

Nainisha Bandari
