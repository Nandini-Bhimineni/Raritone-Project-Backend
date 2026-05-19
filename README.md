# 🚀 Raritone Backend API

A scalable and modular Node.js + Express + MongoDB backend system built for the Raritone platform.  
It includes Authentication, Product Management, and User Profile System with JWT security and image upload support.

---

# 📁 Project Structure

Raritone-Backend/
│
├── config/              # Database configuration
├── controllers/         # Business logic
├── models/              # MongoDB schemas
├── routes/              # API endpoints
├── middleware/          # Auth + upload middleware
├── uploads/             # Image storage
├── server.js            # Entry point
├── .env                 # Environment variables
└── package.json

---

# ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Multer (file uploads)
- dotenv
- CORS

---

# 🔐 Authentication Module

Features:
- User Signup
- User Login
- JWT Authentication
- Forgot / Reset Password
- Logout

APIs:
POST /api/auth/signup  
POST /api/auth/login  
POST /api/auth/logout  
POST /api/auth/forgot-password  
POST /api/auth/reset-password/:token  

---

# 🛒 Product Module

Features:
- Create / Update / Delete Products
- View Products
- Search & Filter
- Pagination & Sorting
- Image Upload Support

APIs:
POST /api/products  
GET /api/products  
GET /api/products/:id  
PUT /api/products/:id  
DELETE /api/products  
GET /api/products/search  

---

# 👤 Profile Module

Features:
- View Profile
- Update Profile
- Upload Avatar
- Manage Preferences
- Edit Personal Info

APIs:
GET /api/profile  
PUT /api/profile/update  
POST /api/profile/avatar  
PUT /api/profile/preferences  

---

# 📷 File Upload System

- Multer-based upload system
- Stored in /uploads
- Supports JPG, JPEG, PNG

Access:
http://localhost:5000/uploads/<filename>

---

# 🔐 Authorization

Protected routes require:

Authorization: Bearer <token>

---

# ⚙️ Setup

npm install  
npm run dev  

---

# 🌐 Environment Variables

PORT=5000  
MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_secret_key  

---

# 🚀 Server Output

MongoDB Connected  
Server running on port 5000  

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

- Email verification  
- Cloudinary integration  
- Role-based access control  
- Swagger documentation  
- Deployment (Render / AWS)

---

# 👨‍💻 Author
Nandini Bhimineni
Meka Hrishi Teja Chowdary 
VishnuVardhan Reddy
Bharat Kumar
Vagdevi Malineni
Nainisha
