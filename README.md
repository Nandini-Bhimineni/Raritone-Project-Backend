Sure 👍 I’ll create a **clean, professional GitHub README.md** for your **Raritone Product Management Backend**.

You can directly copy-paste this into your `README.md`.

---

# 📦 Raritone Backend – Product Management System

A backend system built for the **Raritone platform** using Node.js, Express, and MongoDB.
This module handles full **Product Management with authentication, image upload, search, and filtering.**

---

## 🚀 Features

### 🛒 Product Management

* Add Products
* Update Products
* Delete Products
* View All Products
* View Single Product
* Search Products by Title
* Filter by Category & Price

---

### 🔐 Security

* JWT Authentication
* Protected Routes
* Token-based access control

---

### 📷 Image Upload

* Multer file upload system
* Store product images locally (`/uploads`)
* Image validation (JPG, PNG, JPEG)

---

### 🔍 Advanced Features

* Pagination support
* Sorting (price, date)
* Case-insensitive search
* MongoDB filtering

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Local)
* Mongoose
* JWT (Authentication)
* bcryptjs (Password hashing)
* Multer (File upload)
* Postman (API testing)

---

## 📁 Project Structure

```
raritone-backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── productController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── uploadMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   └── Product.js
│
├── routes/
│   └── productRoutes.js
│
├── uploads/
│
├── server.js
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/raritone-backend.git
cd raritone-backend
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create `.env` file:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/raritoneDB

JWT_SECRET=raritoneSecretKey
```

---

### 4. Start MongoDB (Local)

Make sure MongoDB is running:

```bash
mongod
```

---

### 5. Run Server

```bash
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

## 📡 API Endpoints

### 🔐 Auth Required (JWT)

Add header:

```
Authorization: Bearer <token>
```

---

## 🛒 Product APIs

### ➕ Add Product

```
POST /api/products
```

---

### 📄 Get All Products

```
GET /api/products
```

---

### 🔍 Get Product By ID

```
GET /api/products/:id
```

---

### ✏️ Update Product

```
PUT /api/products/:id
```

---

### ❌ Delete Product

```
DELETE /api/products/:id
```

---

### 🔎 Search Products

```
GET /api/products/search?keyword=iphone
```

---

### 📂 Filter Products

```
GET /api/products/search?category=Electronics
GET /api/products/search?minPrice=1000&maxPrice=90000
```

---

## 🧪 Testing (Postman)

Use Postman to test APIs:

* Set Method (GET/POST/PUT/DELETE)
* Add Authorization (Bearer Token)
* Use `form-data` for image upload

---

## 📷 Image Access

Uploaded images can be accessed at:

```
http://localhost:5000/uploads/<filename>
```

---

## 📌 Database

Using MongoDB

Database Name:

```
raritoneDB
```

Collection:

```
products
```

---

## 👨‍💻 Developer Notes

* MVC architecture followed
* Async/Await used for clean code
* Error handling implemented
* Modular folder structure

---

## Completion Status

✔ Product CRUD
✔ JWT Authentication
✔ Image Upload
✔ Search & Filter
✔ Pagination & Sorting
✔ MongoDB Integration
✔ Postman Testing

---

## 📎 Author

Nandini Bhimineni 
Meka Hrishi Teja Chowdary

---

