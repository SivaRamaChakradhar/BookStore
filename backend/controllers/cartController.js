const Cart = require("../models/Cart");
const Book = require("../models/Book");

const addToCart = async (req, res) => {
    try {
        const { bookId, quantity = 1 } = req.body;

        if (!bookId) {
            return res.status(400).json({
                message: "bookId is required"
            });
        }

        const quantityInt = Number(quantity);
        if (!Number.isInteger(quantityInt) || quantityInt < 1) {
            return res.status(400).json({
                message: "Quantity must be a positive integer"
            });
        }

        const userId = req.user._id;

        const existingCartItem = await Cart.findOne({ userId, bookId });
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        if (existingCartItem) {
            existingCartItem.quantity += quantityInt;
            await existingCartItem.save();
            return res.status(200).json({
                message: "Cart item updated successfully",
                cartItem: existingCartItem,
            });
        }

        const newCartItem = new Cart({ userId, bookId, quantity: quantityInt });
        await newCartItem.save();

        res.status(201).json({
            message: "Cart item added successfully",
            cartItem: newCartItem,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const getCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find({
            userId: req.user._id
        }).populate("bookId", "title author price");

        res.status(200).json({
            message: "Cart items fetched successfully",
            cartItems,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const quantityInt = Number(quantity);
        if (!Number.isInteger(quantityInt) || quantityInt < 1) {
            return res.status(400).json({
                message: "Quantity must be a positive integer"
            });
        }

        const cartItem = await Cart.findOne({
            _id: id,
            userId: req.user._id
        });

        if (!cartItem) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        cartItem.quantity = quantityInt;
        await cartItem.save();

        res.status(200).json({
            message: "Cart item updated successfully",
            cartItem,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;

        const cartItem = await Cart.findOne({
            _id: id,
            userId: req.user._id
        });

        if (!cartItem) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        await cartItem.deleteOne();

        res.status(200).json({
            message: "Cart item removed successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { addToCart, getCartItems, updateCart, removeFromCart };