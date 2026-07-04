const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Book = require("../models/Book");


const createOrder = async (req, res) => {
    try {
        const { shippingAddress } = req.body;

        const cartItems = await Cart.find({
            userId: req.user._id
        }).populate("bookId");

        if (cartItems.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        let totalAmount = 0;
        const items = [];

        for (const item of cartItems) {

            if (item.bookId.stock < item.quantity) {
                return res.status(400).json({
                    message: `${item.bookId.title} is out of stock`
                });
            }

            totalAmount += item.bookId.price * item.quantity;

            items.push({
                bookId: item.bookId._id,
                quantity: item.quantity,
                price: item.bookId.price
            });

            item.bookId.stock -= item.quantity;
            await item.bookId.save();
        }

        const order = await Order.create({
            userId: req.user._id,
            items,
            totalAmount,
            shippingAddress
        });

        await Cart.deleteMany({
            userId: req.user._id
        });

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            userId: req.user._id
        }).populate("items.bookId", "title author price");

        res.status(200).json({
            orders
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getOrderById = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id)
            .populate("items.bookId", "title author price");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        if (
            order.userId.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        res.status(200).json({
            order
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {

        const { orderStatus } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        order.orderStatus = orderStatus;

        await order.save();

        res.status(200).json({
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus
};