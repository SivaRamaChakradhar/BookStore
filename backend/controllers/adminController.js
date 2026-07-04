const User = require("../models/userSchema");
const Book = require("../models/Book");
const Order = require("../models/Order");

const getDashboard = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();

        const totalBooks = await Book.countDocuments();

        const totalOrders = await Order.countDocuments();

        const revenue = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalAmount"
                    }
                }
            }
        ]);

        res.status(200).json({
            totalUsers,
            totalBooks,
            totalOrders,
            totalRevenue: revenue.length ? revenue[0].totalRevenue : 0
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password");

        res.status(200).json({
            users
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getAllBooks = async (req, res) => {

    try {

        const books = await Book.find()
            .populate("sellerId", "name email");

        res.status(200).json({
            books
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("userId", "name email")
            .populate("items.bookId", "title");

        res.status(200).json({
            orders
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.deleteOne();

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const deleteBook = async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        await book.deleteOne();

        res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getDashboard,
    getAllUsers,
    getAllBooks,
    getAllOrders,
    deleteUser,
    deleteBook
};