import { useEffect, useState } from "react";
import UserNavbar from "../UserNavbar/UserNavbar";

import {
    getWishlist,
    removeWishlist
} from "../../../services/wishlistApi";

import { addToCart } from "../../../services/cartApi";

import "./Wishlist.css";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const fetchWishlist = async () => {
        try {
            const { data } = await getWishlist();
            const items = data?.wishlist?.books || [];
            setWishlist(items);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchWishlist();
    }, []);

    const handleRemove = async (id) => {
        try {
            await removeWishlist(id);
            fetchWishlist();
        } catch (error) {
            console.log(error);
        }
    };

    const handleMoveToCart = async (bookId) => {
        try {
            await addToCart({
                bookId,
                quantity: 1
            });
            alert("added to cart");
            await removeWishlist(bookId);
            fetchWishlist();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <UserNavbar />
            <div className="wishlist-container">
                <h1 className="wishlist-title">
                    My Wishlist
                </h1>
                {
                    wishlist.length === 0 ?
                        <h2 className="empty">
                            Your wishlist is empty.
                        </h2>
                        :
                        <div className="wishlist-grid">
                            {
                                wishlist.map((item) => (
                                    <div
                                        className="wishlist-card"
                                        key={item._id}
                                    >
                                        <img
                                            src={item?.itemImage}
                                            alt={item?.title || "Book"}
                                        />
                                       <h2>
                                            {item?.title || "Untitled Book"}
                                        </h2>
                                        <p>
                                            {item?.author || "Unknown Author"}
                                        </p>
                                        <h3>
                                            ₹ {item?.price || 0}
                                        </h3>
                                        <div className="wishlist-buttons">

                                            <button
                                                className="cart-btn"
                                                onClick={() =>
                                                    handleMoveToCart(item?._id)
                                                }
                                            >
                                                Add to Cart
                                            </button>

                                            <button
                                                className="remove-btn"
                                                onClick={() =>
                                                    handleRemove(item?._id)
                                                }
                                            >
                                                Remove
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

export default Wishlist;