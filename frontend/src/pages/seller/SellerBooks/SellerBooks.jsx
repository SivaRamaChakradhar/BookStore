import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SellerNavbar from "../SellerNavbar/SellerNavbar";

import {
    getSellerBooks,
} from "../../../services/sellerApi";

import "./SellerBooks.css";

const SellerBooks = () => {
    const [books, setBooks] = useState([]);
    const fetchBooks = async () => {
        try {
            const { data } = await getSellerBooks();
            setBooks(data.books);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );
        if (!confirmDelete) return;
        try {
            await deleteBook(id);
            fetchBooks();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <SellerNavbar />

            <div className="seller-books-container">
                <div className="header">
                    <h1>My Books</h1>
                </div>
                {
                    books.length === 0 ?
                        <div className="empty-books">
                            <h2>No Books Found</h2>
                        </div>
                        :
                        <div className="books-grid">
                            {
                                books.map(book => (
                                    <div
                                        className="book-card"
                                        key={book._id}
                                    >
                                        <img
                                            src={book.itemImage}
                                            alt={book.title}
                                        />
                                        <div className="book-info">
                                            <h2>{book.title}</h2>
                                            <p>{book.author}</p>
                                            <h3>₹ {book.price}</h3>
                                            <p>
                                                Stock : {book.stock}
                                            </p>
                                        </div>
                                        <div className="actions">
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(book._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
        </>
    );
};

export default SellerBooks;