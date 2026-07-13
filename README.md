# 📚 BookStore – MERN Stack Online Book Shopping System

A full-stack **BookStore** web application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The application allows users to browse and purchase books, sellers to manage their inventory, and administrators to oversee the entire platform.

---

## 🚀 Features

### 👤 User

* User Registration & Login
* JWT Authentication
* Browse Books
* Search & Filter Books
* View Book Details
* Add Books to Cart
* Place Orders
* View Order History
* Manage Profile

### 🏪 Seller

* Seller Registration & Login
* Seller Dashboard
* Add New Books
* Update Book Details
* Delete Books
* View Products
* Manage Orders

### 👨‍💼 Admin

* Admin Login
* Admin Dashboard
* View All Users
* Manage Books
* View All Orders
* Update Order Status

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* CSS
* React Icons

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js

---

# 📁 Project Structure

## Backend

```text
backend/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── server.js
└── package.json
```

## Frontend

```text
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

---

# 🗄️ Database Collections

### Users

```text
_id
name
email
password
role
createdAt
updatedAt
```

### Books

```text
_id
title
author
genre
description
price
itemImage
sellerId
sellerName
createdAt
updatedAt
```

### Orders

```text
_id
userId
items[]
totalAmount
shippingAddress
orderStatus
createdAt
```

---

# 🔐 Authentication

* Password hashing using **bcrypt**
* JWT Token Authentication
* Protected Routes
* Role-Based Authorization

Roles:

* User
* Seller
* Admin

---

# 📦 REST APIs

## Authentication

```http
POST /api/users/register
POST /api/users/login
GET  /api/users/profile
```

## Books

```http
GET    /api/books
GET    /api/books/:id
POST   /api/books
PUT    /api/books/:id
DELETE /api/books/:id
```

## Cart

```http
GET    /api/cart
POST   /api/cart
PUT    /api/cart/:id
DELETE /api/cart/:id
```

## Orders

```http
POST /api/orders
GET  /api/orders
GET  /api/orders/:id
```

---

# VIDEO DEMO

<details>
  <summary>🎬 View Video Demo</summary>
  <video src="video_demo.mov" width="100%" controls></video>
</details>

---

# 💻 Installation

## Clone Repository

```bash
git clone https://github.com/sivaramachakradhar/bookstore.git
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# ✨ Application Flow

```text
User
   │
   ▼
Register / Login
   │
   ▼
Browse Books
   │
   ▼
View Book Details
   │
   ▼
Add to Cart
   │
   ▼
Checkout
   │
   ▼
Place Order
```

---

# 📸 Screens

* Home Page
* Login
* Register
* Book Listing
* Book Details
* Cart
* Orders
* Seller Dashboard
* Admin Dashboard

---

# 🔮 Future Enhancements

* Wishlist
* Reviews & Ratings
* Online Payments
* Email Notifications
* Sales Analytics
* Coupon System
* Inventory Management

---

# 👨‍💻 Author

**Siva Rama Chakradhar**

* GitHub: https://github.com/SivaRamaChakradhar
* Portfolio: https://sivas-portfolio-five.vercel.app/

---

# 📄 License

This project is developed for educational and learning purposes.
