const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const sellerOnly = require("../middleware/sellerOnly");

const {
    getDashboard,
    getMyBooks,
    getSellerOrders
} = require("../controllers/sellerController");

const {
    createBook,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

router.use(protect, sellerOnly);

// Dashboard
router.get("/dashboard", getDashboard);

// Books
router.get("/books", getMyBooks);
router.post("/books", createBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

// Orders
router.get("/orders", getSellerOrders);

module.exports = router;