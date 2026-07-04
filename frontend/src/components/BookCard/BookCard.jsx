import { Link } from "react-router-dom";
import "./BookCard.css";

const BookCard = ({ book }) => {
    return (
        <div className="book-card">
            <img
                src={book?.itemImage || "https://via.placeholder.com/180x240?text=Book"}
                alt={book?.title}
                className="book-card-image"
            />
            <div className="book-card-content">
                <h3 className="book-card-title">
                    {book?.title}
                </h3>
                <p className="book-card-author">
                    {book?.author}
                </p>
                <p className="book-card-price">
                    ₹{book?.price}
                </p>
                <Link
                    to={`/user/books/${book?._id}`}
                    className="view-btn"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default BookCard;