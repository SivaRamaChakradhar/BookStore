const express = require("express");

const { addToCart, getCartItems, updateCart, removeFromCart } = require("../controllers/cartController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addToCart);

router.get("/", protect, getCartItems);

router.put("/:id", protect, updateCart);

router.delete("/:id", protect, removeFromCart);


module.exports = router;