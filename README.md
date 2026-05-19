# User Profile System Backend

A secure backend application built using Node.js, Express.js, MongoDB Atlas, and JWT Authentication for managing user profiles.

---

# Features

* User Registration
* User Login Authentication
* JWT Protected Routes
* View Profile
* Update Profile
* Upload Avatar Image
* Save User Preferences
* Edit Personal Details
* MongoDB Atlas Integration
* Multer Image Upload Support

---

# Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Multer
* bcryptjs
* dotenv
* CORS

---

# Project Structure

```bash
server/
│
├── middleware/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
│
├── models/
│   ├── User.js
│   └── Profile.js
│
├── routes/
│   ├── authRoutes.js
│   └── profileRoutes.js
│
├── uploads/
│
├── .env
├── package.json
└── server.js
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Nandini-Bhimineni/Raritone-Project-Backend.git
```

## Navigate to Project Folder

```bash
cd servver
```

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=mysecretkey
```

---

# Run Server

```bash
node server.js
```

Expected Output:

```bash
MongoDB Connected
Server running on port 5000
```

---

# API Endpoints

## Authentication APIs

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

---

## Profile APIs

### Get Profile

```http
GET /api/profile
```

### Update Profile

```http
PUT /api/profile/update
```

### Upload Avatar

```http
POST /api/profile/avatar
```

### Save Preferences

```http
PUT /api/profile/preferences
```

---

# Authorization

Protected routes require JWT token in headers.

```bash
Authorization: your_jwt_token
```

---

# Example Request Body

## Update Profile

```json
{
  "bio": "Backend Developer",
  "personalDetails": {
    "fullName": "Vagdevi",
    "phone": "9876543210",
    "location": "India"
  }
}
```

---

# Avatar Upload

Use `form-data` in Postman.

| KEY    | TYPE |
| ------ | ---- |
| avatar | File |

Supported Formats:

* JPG
* JPEG
* PNG

---

# Database Schema

## Profile Schema

```javascript
Profile {
  userId,
  avatar,
  bio,
  preferences,
  updatedAt
}
```

---

# Git Commands

## Push Feature Branch

```bash
git checkout -b profile-module

git add .

git commit -m "Feat: Implement profile controller, routes, and Multer avatar schema bindings"

git push -u origin profile-module
```

---

# Future Improvements

* Email Verification
* Forgot Password
* Cloudinary Storage
* Role Based Access
* Swagger Documentation
* Deployment Support

---

# Authors

Developed by Vagdevi and Nainisha

