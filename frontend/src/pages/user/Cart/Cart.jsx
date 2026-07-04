import { useEffect, useState } from "react";
import UserNavbar from "../UserNavbar/UserNavbar";

import {
    getCart,
    updateCart,
    removeFromCart
} from "../../../services/cartApi";

import { createOrder } from "../../../services/orderApi";

import "./Cart.css";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCart = async () => {
        try {
            const { data } = await getCart();
            const items = data?.cartItems || [];

            setCartItems(items);

          

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        fetchCart();
    }, []);

    const increaseQuantity = async (item) => {

        await updateCart(item._id, {
            quantity: item.quantity + 1
        });

        fetchCart();

    };

    const decreaseQuantity = async (item) => {

        if (item.quantity === 1) return;

        await updateCart(item._id, {
            quantity: item.quantity - 1
        });

        fetchCart();

    };

    const removeItem = async (id) => {

        await removeFromCart(id);

        fetchCart();

    };

    const total = cartItems.reduce((sum, item) => {
        return sum + (item?.bookId?.price || 0) * item.quantity;
    }, 0);

    const checkout = async () => {

        if (cartItems.length === 0) {
            alert("Cart is empty");
            return;
        }

        const shippingAddress = prompt("Enter Shipping Address");

        if (!shippingAddress) return;

        const items = cartItems.map(item => ({
            bookId: item?.bookId?._id,
            quantity: item.quantity,
            price: item?.bookId?.price || 0
        }));


        try {

            await createOrder({
                items,
                totalAmount: total,
                shippingAddress
            });

            alert("Order placed successfully!");

            fetchCart();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>
            <UserNavbar />
            <div className="cart-container">
                <h1>My Cart</h1>
                {
                    cartItems.length === 0 ?
                        <h2 className="empty">
                            Cart is Empty
                        </h2>
                        :
                        <>
                            {
                                cartItems.map(item => (
                                    <div
                                        className="cart-card"
                                        key={item._id}
                                    >
                                        <img
                                            src={item?.bookId?.itemImage}
                                            alt={item?.bookId?.title || "Book"}
                                        />
                                        <div className="cart-info">
                                            <h2>
                                                {item?.bookId?.title || "Untitled Book"}
                                            </h2>
                                            <p>
                                                {item?.bookId?.author || "Unknown Author"}
                                            </p>
                                            <h3>
                                                ₹ {item?.bookId?.price || 0}
                                            </h3>
                                            <div className="quantity">
                                                <button
                                                    onClick={() => decreaseQuantity(item)}
                                                >
                                                    -
                                                </button>
                                                <span>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => increaseQuantity(item)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeItem(item._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))
                            }

                            <div className="cart-summary">
                                <h2>
                                    Total : ₹ {total}
                                </h2>
                                <button
                                    className="checkout-btn"
                                    onClick={checkout}
                                >
                                    Checkout
                                </button>
                            </div>
                        </>
                }
            </div>
        </>
    );
};

export default Cart;