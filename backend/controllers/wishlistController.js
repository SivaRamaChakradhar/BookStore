const WishList = require('../models/WishList');

// Add a book to the wishlist
const addToWishlist = async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user?._id;

    if (!userId || !bookId) {
        return res.status(400).json({ message: 'Missing user or book information' });
    }

    try {
        let wishlist = await WishList.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new WishList({ user: userId, books: [] });
        }

        if (wishlist.books.some((id) => id.toString() === bookId)) {
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
    const userId = req.user?._id;

    if (!userId) {
        return res.status(400).json({ message: 'Missing user information' });
    }

    try {
        const wishlist = await WishList.findOne({ user: userId }).populate('books');

        if (!wishlist) {
            return res.status(200).json({ wishlist: { user: userId, books: [] } });
        }

        res.status(200).json({ wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove a book from the wishlist
const removeFromWishlist = async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user?._id;
    const id = req.params.bookId || bookId;

    if (!userId || !id) {
        return res.status(400).json({ message: 'Missing user or book information' });
    }

    try {
        const wishlist = await WishList.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        wishlist.books = wishlist.books.filter((book) => book.toString() !== id);
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