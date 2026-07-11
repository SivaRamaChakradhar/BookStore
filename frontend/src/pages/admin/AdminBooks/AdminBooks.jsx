import { useEffect, useState } from "react";

import AdminNavbar from "../AdminNavbar/AdminNavbar";

import {
    getBooks,
    deleteBook
} from "../../../services/adminApi";

import "./AdminBooks.css";

const AdminBooks = () => {
    const [books, setBooks] = useState([]);
    const fetchBooks = async () => {
        try {
            const { data } = await getBooks();
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
        console.log("deleting");
        try {
            await deleteBook(id);
            fetchBooks();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="admin-books-container">
                <h1>Manage Books</h1>
                {
                    books.length === 0 ?
                        <h2 className="empty">
                            No Books Found
                        </h2>
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
                                            <p>
                                                <strong>Author:</strong> {book.author}
                                            </p>
                                            <p>
                                                <strong>Genre:</strong> {book.genre}
                                            </p>
                                            <p>
                                                <strong>Price:</strong> ₹ {book.price}
                                            </p>
                                            <p>
                                                <strong>Stock:</strong> {book.stock}
                                            </p>
                                            <p>
                                                <strong>Seller:</strong> {book.sellerId?.name}
                                            </p>
                                            <p className="seller-email">
                                                {book.sellerId?.email}
                                            </p>
                                        </div>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(book._id)}
                                        >
                                            Delete Book
                                        </button>
                                    </div>
                                ))
                            }

                        </div>
                }
            </div>
        </>
    );
};

export default AdminBooks;