import { useEffect, useState } from "react";
import { getBooks } from "../../../services/bookApi";
import UserNavbar from "../UserNavbar/UserNavbar.jsx";
import BookCard from "../../../components/BookCard/BookCard.jsx";

import "./UserHome.css";

const UserHome = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await getBooks();
                setBooks(data.books);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="user-home">

            <UserNavbar />

            {/* Best Seller */}

            <section className="section">

                <h1 className="section-title">
                    Best Seller
                </h1>

                <div className="books-container">

                    {books.slice(0, 4).map(book => (
                        <BookCard
                            key={book._id}
                            book={book}
                        />
                    ))}

                </div>

            </section>

            {/* Top Recommendation */}

            <section className="section">

                <h1 className="section-title">
                    Top Recommendation
                </h1>

                <div className="books-container">

                    {books.slice(4, 8).map(book => (
                        <BookCard
                            key={book._id}
                            book={book}
                        />
                    ))}

                </div>

            </section>

            {/* Contact */}

            <section className="contact">

                <button>
                    Contact Us
                </button>

                <p>
                    "Embark on a literary journey with our book heaven —
                    where every page turns into an adventure!"
                </p>

                <p>Email : support@bookverse.com</p>

                <p>Call : +91 9876543210</p>

            </section>

            {/* Footer */}

            <footer className="footer">

                © 2026 BookVerse. All Rights Reserved.

            </footer>

        </div>
    );
};

export default UserHome;