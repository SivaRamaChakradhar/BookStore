const express = require("express");
const protect = require("../middleware/authMiddleware");

const { createOrder, getMyOrders, getOrderById, updateOrderStatus } = require("../controllers/orderController");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id", protect, updateOrderStatus);

module.exports = router;
