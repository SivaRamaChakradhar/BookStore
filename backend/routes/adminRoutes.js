const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/adminOnly");

const {
    getDashboard,
    getAllUsers,
    getAllBooks,
    getAllOrders,
    deleteUser,
    deleteBook
} = require("../controllers/adminController");

router.use(protect, adminOnly);

router.get("/dashboard", getDashboard);

router.get("/users", getAllUsers);

router.get("/books", getAllBooks);

router.get("/orders", getAllOrders);

router.delete("/users/:id", deleteUser);

router.delete("/books/:id", deleteBook);

module.exports = router;