import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SellerNavbar from "../SellerNavbar/SellerNavbar";
import { createBook } from "../../../services/bookApi";

import "./AddBook.css";

const AddBook = () => {

    const navigate = useNavigate();

    const [book, setBook] = useState({
        title: "",
        author: "",
        genre: "",
        description: "",
        itemImage: "",
        price: "",
        stock: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setBook({
            ...book,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createBook(book);
            alert("Book Added Successfully!");
            navigate("/seller/books");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to add book.");
        }
        setLoading(false);
    };

    return (
        <>
            <SellerNavbar />
            <div className="add-book-container">
                <form
                    className="add-book-form"
                    onSubmit={handleSubmit}
                >
                    <h1>Add New Book</h1>
                    <div className="form-group">
                        <label>Book Title</label>
                        <input
                            type="text"
                            name="title"
                            value={book.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <input
                            type="text"
                            name="author"
                            value={book.author}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Genre</label>
                        <input
                            type="text"
                            name="genre"
                            value={book.genre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={book.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={book.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Image URL</label>
                        <input
                            type="text"
                            name="itemImage"
                            value={book.itemImage}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            rows="5"
                            name="description"
                            value={book.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Book"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddBook;