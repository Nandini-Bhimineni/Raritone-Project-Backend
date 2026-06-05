# Raritone Backend API

A scalable, secure, and modular Node.js + Express + MongoDB backend powering the Raritone Virtual Fashion Platform.

The backend supports Authentication, Product Management, User Profiles, Wishlist, Wardrobe, Cart, Orders, Measurements, Avatar Management, Product Mapping, Virtual Try-On, Media Processing, Cloudinary Integration, Realtime Communication, and AI-ready Architecture.

---

# 👨‍💻 Project Contributors

- Nandini Bhimineni
- Meka Hrishi Teja Chowdary
- Bharath Kumar
- Vishnu Vardhan Reddy
- Vagdevi Malineni
- Nainisha Bandari

---

# 🚀 Core Features

✔ JWT Authentication

✔ Google OAuth Integration

✔ Role Based Access Control (RBAC)

✔ Product Management

✔ Wishlist Management

✔ Wardrobe Management

✔ User Profiles

✔ Cart Management

✔ Order Management

✔ User Measurements

✔ Virtual Try-On Module

✔ Avatar Management Module

✔ Product Mapping Module

✔ Cloudinary Integration

✔ Image Upload Support

✔ Validation Layer

✔ Error Handling Middleware

✔ Helmet Security

✔ Rate Limiting

✔ MongoDB Relationships

✔ Mongoose Populate

✔ RESTful APIs

✔ AI-Ready Backend Architecture

✔ Realtime Architecture Planning

✔ Scalability Research

---

# ⚙️ Technology Stack

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JWT
- Google OAuth

## Storage
- Cloudinary
- Multer

## Security
- Helmet
- Express Rate Limit
- CORS

## Realtime
- Socket.IO

## Media Processing
- Sharp

## Utilities
- dotenv
- Morgan

---

# 📁 Project Structure

```text
Raritone-Project-Backend/
│
├── config/
│   ├── cloudinary.js
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── avatarController.js
│   ├── cartController.js
│   ├── googleAuthController.js
│   ├── imageController.js
│   ├── measurementController.js
│   ├── orderController.js
│   ├── productController.js
│   ├── profileController.js
│   ├── tryOnController.js
│   ├── wardrobeController.js
│   └── wishlistController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   ├── roleMiddleware.js
│   ├── uploadMiddleware.js
│   └── validate.js
│
├── models/
│   ├── Avatar.js
│   ├── cart.js
│   ├── Image.js
│   ├── measurement.js
│   ├── order.js
│   ├── product.js
│   ├── ProductMapping.js
│   ├── Profile.js
│   ├── TryOn.js
│   ├── user.js
│   ├── Wardrobe.js
│   └── Wishlist.js
│
├── routes/
│   ├── authRoutes.js
│   ├── avatarRoutes.js
│   ├── cartRoutes.js
│   ├── imageRoutes.js
│   ├── measurementRoutes.js
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   ├── profileRoutes.js
│   ├── tryOnRoutes.js
│   ├── wardrobeRoutes.js
│   └── wishlistRoutes.js
│
├── uploads/
│
├── utils/
│   ├── cloudinaryUpload.js
│   └── generateToken.js
│
├── validators/
│   ├── authValidator.js
│   ├── avatarValidator.js
│   ├── loginValidator.js
│   ├── productValidator.js
│   ├── registerValidator.js
│   └── tryOnValidator.js
│
├── .env
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

# 🔐 Authentication Module

## Features

- User Registration
- User Login
- Logout
- Forgot Password
- Reset Password
- Google OAuth Login
- JWT Authentication
- Refresh Tokens
- Protected Routes

## APIs

POST /api/auth/signup

POST /api/auth/login

POST /api/auth/logout

POST /api/auth/forgot-password

POST /api/auth/reset-password/:token

POST /api/auth/google

---

# 🛒 Product Module

## Features

- Add Product
- Update Product
- Delete Product
- Search Products
- Filter Products
- Product Image Upload

## APIs

POST /api/products

GET /api/products

GET /api/products/:id

PUT /api/products/:id

DELETE /api/products/:id

---

# 👤 Profile Module

## Features

- View Profile
- Update Profile
- Upload Profile Image
- Preferences Management

## APIs

GET /api/profile

PUT /api/profile/update

POST /api/profile/avatar

---

# ❤️ Wishlist Module

## Features

- Add To Wishlist
- Remove From Wishlist
- View Wishlist

## APIs

POST /api/wishlist/add

GET /api/wishlist

DELETE /api/wishlist/remove/:productId

---

# 👕 Wardrobe Module

## Features

- Add Clothing Items
- View Wardrobe
- Remove Clothing Items

## APIs

POST /api/wardrobe/add

GET /api/wardrobe

DELETE /api/wardrobe/:id

---

# 🛍️ Cart Module

## Features

- Add To Cart
- View Cart
- Remove Items

## APIs

POST /api/cart

GET /api/cart

DELETE /api/cart/:productId

---

# 📦 Order Module

## Features

- Create Order
- View Orders
- Update Order Status
- Delete Order

## APIs

POST /api/orders

GET /api/orders

GET /api/orders/:id

PUT /api/orders/:id

DELETE /api/orders/:id

---

# 📏 Measurement Module

## Features

- Save Measurements
- Retrieve Measurements
- Delete Measurements

## APIs

POST /api/measurements

GET /api/measurements

DELETE /api/measurements

---

# 🧠 Try-On Module

## Features

- Virtual Try-On Requests
- Outfit Preview Handling
- User Image Processing
- AI Integration Ready Structure

## APIs

POST /api/tryOnRoutes

GET /api/tryOnRoutes

---

# 👤 Avatar Module

## Features

- Store Avatar Information
- User Avatar Management
- AI Avatar Ready Structure
- Avatar Status Tracking

## Schema Fields

- userId
- avatarImage
- bodyType
- skinTone
- gender
- avatarModel
- status

## APIs

POST /api/avatar

GET /api/avatar

GET /api/avatar/:id

GET /api/avatar/user/:userId

DELETE /api/avatar/:id

---

# 🔗 Product Mapping Module

## Purpose

Maps products with user attributes, measurements, avatars, and recommendation workflows.

## Benefits

- Recommendation Support
- AI Personalization
- Virtual Try-On Matching
- Product Compatibility Analysis

---

# 📷 Media Processing Workflow

```text
User Uploads Image
        ↓
Multer Upload
        ↓
Sharp Compression
        ↓
WebP Optimization
        ↓
Cloudinary Upload
        ↓
CDN Delivery
        ↓
Response
```

---

# ⚡ Realtime Architecture

## Socket.IO Support

Planned Events:

- tryon-processing
- tryon-completed
- avatar-processing
- avatar-completed
- recommendation-updated

---

# 🗄️ Database Relationships

User → Profile

User → Wishlist

User → Wardrobe

User → Cart

User → Orders

User → Measurements

User → Avatars

Wishlist → Product

Cart → Product

Order → Product

ProductMapping → Product

MongoDB ObjectId references are used with Mongoose populate().

---

# 🔐 Security Features

- JWT Authentication
- Refresh Tokens
- Google OAuth
- RBAC
- Helmet Security
- Rate Limiting
- Input Validation
- Error Middleware
- Protected APIs

---

# 🏗️ Scalable Architecture

```text
Frontend / Mobile App
          ↓
      Backend API
          ↓
       Socket.IO
          ↓
      AI Services
          ↓
      Cloudinary
          ↓
     MongoDB Atlas
          ↓
       Response
```

---

# 🚀 Future Roadmap

## Phase 1

- AI Avatar Generation
- Recommendation Engine

## Phase 2

- Redis Caching
- Queue Systems

## Phase 3

- Docker Deployment
- Kubernetes Scaling

## Phase 4

- AWS Infrastructure
- CDN Expansion

## Phase 5

- Full AI Virtual Try-On Engine

---

# ⚙️ Setup Instructions

## Install Dependencies

```bash
npm install
```

## Run Server

```bash
npm run dev
```

---

# 🌐 Environment Variables

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

JWT_REFRESH_SECRET=your_refresh_secret

GOOGLE_CLIENT_ID=your_google_client_id

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

# 🚀 Server Output

```text
MongoDB Connected

Server Running
```

---

# ✅ Final Status

✔ Backend Integration Completed

✔ API Development Completed

✔ Security Layer Completed

✔ Database Relationships Completed

✔ Product Mapping Added

✔ Avatar Module Added

✔ Media Processing Added

✔ Cloudinary Integration Added

✔ AI Integration Planning Completed

✔ Documentation Completed

✔ Testing Completed

✔ Deployment Research Completed

---

# 🌿 Final Branch

final-main

---

# 📌 Authors

- Nandini Bhimineni
- Meka Hrishi Teja Chowdary
- Bharath Kumar
- Vishnu Vardhan Reddy
- Vagdevi Malineni
- Nainisha Bandari
