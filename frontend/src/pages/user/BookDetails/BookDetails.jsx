import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import UserNavbar from "../UserNavbar/UserNavbar";
import { getBook } from "../../../services/bookApi";
import { addToCart } from "../../../services/cartApi";
import { addToWishlist } from "../../../services/wishlistApi";

import "./BookDetails.css";

const BookDetails = () => {

    const { id } = useParams();

    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await getBook(id);
                setBook(data.book);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBook();
    }, [id]);

    const handleCart = async () => {
        try {
            await addToCart({
                bookId: book._id,
                quantity: 1
            });
            alert("Book added to cart");

        } catch (error) {
            console.log(error);
        }
    };

    const handleWishlist = async () => {
        try {
            await addToWishlist({
                bookId: book._id
            });
            alert("Book added to wishlist");
        } catch (error) {
            console.log(error);
        }
    };
    if (!book) {
        return (
            <>
                <UserNavbar />
                <h2 className="loading">Loading...</h2>
            </>
        );
    }

    return (
        <>
            <UserNavbar />

            <div className="book-details-container">
                <div className="book-image-section">
                    <img
                        src={book.itemImage}
                        alt={book.title}
                    />
                </div>

                <div className="book-info-section">
                    <h1>{book.title}</h1>
                    <p>
                        <strong>Author :</strong> {book.author}
                    </p>

                    <p>
                        <strong>Genre :</strong> {book.genre}
                    </p>

                    <p>
                        <strong>Seller :</strong> {book.sellerId?.name}
                    </p>

                    <p> 
                        <strong>Stock :</strong> {book.stock}
                    </p>

                    <h2 className="price">
                        ₹ {book.price}
                    </h2>

                    <div className="buttons">

                        <button
                            className="wishlist-btn"
                            onClick={handleWishlist}
                        >
                            ❤️ Wishlist
                        </button>

                        <button
                            className="cart-btn"
                            onClick={handleCart}
                        >
                            🛒 Add to Cart
                        </button>

                    </div>

                </div>

            </div>

            <div className="description">

                <h2>Description</h2>

                <p>
                    {book.description}
                </p>

            </div>

        </>

    );

};

export default BookDetails;