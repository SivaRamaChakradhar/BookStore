import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SellerNavbar from "..//SellerNavbar/SellerNavbar";
import BookCard from "../../../components/BookCard/BookCard";

import { getSellerBooks } from "../../../services/sellerApi";

import "./SellerHome.css";

const SellerHome = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await getSellerBooks();
                setBooks(data.books);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBooks();
    }, []);

    const totalStock = books.reduce(
        (sum, book) => sum + book.stock,
        0
    );

    return (
        <>
            <SellerNavbar />
            <div className="seller-home">
                <h1 className="welcome">
                    Welcome Seller 👋
                </h1>
                {/* Dashboard Cards */}
                <div className="dashboard">
                    <div className="dashboard-card">
                        <h2>{books.length}</h2>
                        <p>Total Books</p>
                    </div>
                    <div className="dashboard-card">
                        <h2>{totalStock}</h2>
                        <p>Total Stock</p>
                    </div>
                </div>
                {/* Recent Books */}
                <h2 className="section-title">
                    Your Books
                </h2>
                <div className="books-grid">
                    {
                        books.slice(0, 4).map(book => (
                            <BookCard
                                key={book._id}
                                book={book}
                            />
                        ))
                    }
                </div>
                {/* Quick Actions */}
                <div className="quick-actions">
                    <Link
                        to="/seller/products"
                        className="action-btn"
                    >
                        View Products
                    </Link>
                    <Link
                        to="/seller/orders"
                        className="action-btn"
                    >
                        View Orders
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SellerHome;