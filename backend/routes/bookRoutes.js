const express = require('express');
const protect = require('../middleware/authMiddleware');
const sellerOnly = require('../middleware/sellerOnly');

const { createBook, getBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');

const router = express.Router();

router.post('/', protect, sellerOnly, createBook);
router.get('/', getBooks);



router.get('/:id', getBookById);
router.put('/:id', protect, sellerOnly, updateBook);
router.delete('/:id', protect, sellerOnly, deleteBook);

module.exports = router;