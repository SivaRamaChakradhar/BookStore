const Book = require('../models/Book');

const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      description,
      itemImage,
      price,
      stock,
    } = req.body;

    const book = await Book.create({
      title,
      author,
      genre,
      description,
      itemImage,
      price,
      stock,
      sellerId: req.user._id,
    });

    res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBooks = async (req, res) => {
    try {

        const {
            search,
            genre,
            sort,
            page = 1,
            limit = 10
        } = req.query;

        let filter = {};

        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    author: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        if (genre) {
            filter.genre = genre;
        }

        const books = await Book.find(filter)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalBooks = await Book.countDocuments(filter);

        res.status(200).json({
            currentPage: Number(page),
            totalPages: Math.ceil(totalBooks / limit),
            totalBooks,
            books
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getBookById = async (req, res) => {
    try{
        const book = await Book.findById(req.params.id).populate("sellerId", "name email");
        if(!book){
            return res.status(404).json({
                message: "Book not found"
            })
        }
        res.status(200).json({
            book
        })
    }catch(e){
        res.status(500).json({
            message: e.message
        })
    }
}

const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        // Only the seller who created the book or an admin can update it
        if (
            book.sellerId.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
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

        // Only the seller who created the book or an admin can delete it
        if (
            book.sellerId.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        await book.deleteOne();

        res.status(200).json({
            message: "Book deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};



module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
}