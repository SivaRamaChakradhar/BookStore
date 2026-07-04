import { useEffect, useState } from "react";

import UserNavbar from "../UserNavbar/UserNavbar";
import BookCard from "../../../components/BookCard/BookCard.jsx";

import { getBooks } from "../../../services/bookApi";

import "./Books.css";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await getBooks();
                setBooks(data.books);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);
    return (
        <>
            <UserNavbar />
            <div className="books-page">
                <h1 className="books-heading">
                    Explore Books
                </h1>
                {/* Search & Filter */}
                <div className="books-top">
                    <input
                        type="text"
                        placeholder="Search books..."
                        className="search-input"
                    />
                    <select className="filter-select">
                        <option>All Genres</option>
                        <option>Programming</option>
                        <option>Self Help</option>
                        <option>Fiction</option>
                        <option>Finance</option>
                    </select>
                    <select className="filter-select">
                        <option>Sort By</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>A-Z</option>
                    </select>
                </div>
                {
                    loading ?
                        <h2 className="loading">
                            Loading Books...
                        </h2>
                        :
                        <div className="books-grid">
                            {
                                books.map(book => (
                                    <BookCard
                                        key={book._id}
                                        book={book}
                                    />
                                ))
                            }
                        </div>
                }
            </div>
        </>
    );
};

export default Books;