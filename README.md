
---

# Raritone Backend API

A scalable and modular **Node.js + Express + MongoDB** backend system built for the Raritone platform.
It includes Authentication, Product Management, and User Profile System with JWT security and image upload support.

---

# Module Ownership

## 🔐 Authentication Module

Developed by:

* **Bharath Kumar**
* **Vishnu Vardhan Reddy**

---

## 🛒 Product Module

Developed by:

* **Nandini Bhimineni**
* **Meka Hrishi Teja Chowdary**

---

## 👤 Profile Module

Developed by:

* **Vagdevi Malineni**
* **Nainisha**

---

## 🔗 Final Integration (Main Branch)

Handled by:

* **Nandini Bhimineni**
* **Bharath Kumar**

---

# 📁 Project Structure

```
Project Structure
Raritone-Backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── productController.js
│
├── models/
│   ├── User.js
│   └── Product.js
│
├── routes/
│   ├── authRoutes.js
│   └── productRoutes.js
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

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcryptjs
* Multer (file uploads)
* dotenv
* CORS

---

# 🔐 Authentication Module

### Features:

* User Signup
* User Login
* JWT Authentication
* Forgot / Reset Password
* Logout

### APIs:

```
POST /api/auth/signup  
POST /api/auth/login  
POST /api/auth/logout  
POST /api/auth/forgot-password  
POST /api/auth/reset-password/:token  
```

---

# 🛒 Product Module

### Features:

* Create / Update / Delete Products
* View Products
* Search & Filter
* Image Upload Support

### APIs:

```
POST /api/products  
GET /api/products  
GET /api/products/:id  
PUT /api/products/:id  
DELETE /api/products  
GET /api/products/search  
```

---

# 👤 Profile Module

### Features:

* View Profile
* Update Profile
* Upload Avatar
* Manage Preferences

### APIs:

```
GET /api/profile  
PUT /api/profile/update  
POST /api/profile/avatar  
PUT /api/profile/preferences  
```

---

# 📷 File Upload System

* Multer-based upload system
* Stored in `/uploads`
* Supports JPG, JPEG, PNG

Access:

```
http://localhost:5000/uploads/<filename>
```

---

# 🔐 Authorization

Protected routes require:

```
Authorization: Bearer <token>
```

---

# ⚙️ Setup

```bash
npm install  
npm run dev  
```

---

# 🌐 Environment Variables

```
PORT=5000  
MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_secret_key  
```

---

# 🚀 Server Output

```
MongoDB Connected  
Server running on port 5000  
```

---

# 📌 Features Summary

✔ Authentication system
✔ Product management system
✔ Profile management system
✔ JWT security
✔ Image upload support
✔ Modular architecture

---

# 🔮 Future Improvements

* Email verification system
* Cloudinary integration
* Role-based access control
* Swagger API documentation
* Production deployment (Render / AWS)

---

# 👨‍💻 Author
* Nandini Bhimineni
* Meka Hrishi Teja Chowdary
* Bharath Kumar
* Vishnu Vardhan Reddy
* Vagdevi Malineni
* Nainisha

---

