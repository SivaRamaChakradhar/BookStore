const Book = require("../models/Book");
const Order = require("../models/Order");

// Seller Dashboard
const getDashboard = async (req, res) => {
    try {

        const totalBooks = await Book.countDocuments({
            sellerId: req.user._id
        });

        const books = await Book.find({
            sellerId: req.user._id
        });

        const booksInStock = books.reduce(
            (total, book) => total + book.stock,
            0
        );

        const orders = await Order.find()
            .populate("items.bookId");

        let totalOrders = 0;
        let totalRevenue = 0;

        orders.forEach(order => {
            order.items.forEach(item => {
                if (
                    item.bookId &&
                    item.bookId.sellerId.toString() === req.user._id.toString()
                ) {
                    totalOrders++;

                    totalRevenue += item.price * item.quantity;
                }
            });
        });

        res.status(200).json({
            totalBooks,
            booksInStock,
            totalOrders,
            totalRevenue
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// View Seller Books
const getMyBooks = async (req, res) => {
    try {

        const books = await Book.find({
            sellerId: req.user._id
        });

        res.status(200).json({
            books
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// View Seller Orders
const getSellerOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("userId", "name email")
            .populate("items.bookId");

        const sellerOrders = [];

        orders.forEach(order => {

            const items = order.items.filter(item =>
                item.bookId &&
                item.bookId.sellerId.toString() === req.user._id.toString()
            );

            if (items.length > 0) {
                sellerOrders.push({
                    _id: order._id,
                    customer: order.userId,
                    shippingAddress: order.shippingAddress,
                    orderStatus: order.orderStatus,
                    createdAt: order.createdAt,
                    items
                });
            }

        });

        res.status(200).json({
            orders: sellerOrders
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    getDashboard,
    getMyBooks,
    getSellerOrders
};