const WishList = require('../models/WishList');

// Add a book to the wishlist
const addToWishlist = async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        let wishlist = await WishList.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new WishList({ user: userId, books: [] });
        }

        // Check if the book is already in the wishlist
        if (wishlist.books.includes(bookId)) {
            return res.status(400).json({ message: 'Book is already in the wishlist' });
        }

        wishlist.books.push(bookId);
        await wishlist.save();

        res.status(200).json({ message: 'Book added to wishlist', wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get the user's wishlist
const getWishlist = async (req, res) => {
    const { userId } = req.params;

    try {
        const wishlist = await WishList.findOne({ user: userId }).populate('books');

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        res.status(200).json({ wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove a book from the wishlist
const removeFromWishlist = async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        const wishlist = await WishList.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        wishlist.books = wishlist.books.filter(book => book.toString() !== bookId);
        await wishlist.save();

        res.status(200).json({ message: 'Book removed from wishlist', wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist
};