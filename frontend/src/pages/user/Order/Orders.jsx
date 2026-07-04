import { useEffect, useState } from "react";

import UserNavbar from "../UserNavbar/UserNavbar";
import { getMyOrders } from "../../../services/orderApi";

import "./Orders.css";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const fetchOrders = async () => {

        try {
            const { data } = await getMyOrders();
            setOrders(data.orders);

        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <UserNavbar />

            <div className="orders-container">

                <h1 className="orders-title">
                    My Orders
                </h1>

                {
                    orders.length === 0 ?

                        <h2 className="empty">
                            No Orders Found
                        </h2>

                        :

                        orders.map(order => (

                            <div
                                className="order-card"
                                key={order._id}
                            >

                                <div className="order-header">

                                    <div>

                                        <h3>
                                            Order ID
                                        </h3>

                                        <p>{order._id}</p>

                                    </div>

                                    <span className={`status ${order.orderStatus.toLowerCase()}`}>
                                        {order.orderStatus}
                                    </span>

                                </div>

                                <hr />

                                {
                                    order.items.map(item => (

                                        <div
                                            className="order-item"
                                            key={item.bookId._id}
                                        >

                                            <img
                                                src={item.bookId.itemImage}
                                                alt={item.bookId.title}
                                            />

                                            <div className="book-info">

                                                <h2>
                                                    {item.bookId.title}
                                                </h2>

                                                <p>
                                                    {item.bookId.author}
                                                </p>

                                                <p>
                                                    Quantity : {item.quantity}
                                                </p>

                                                <p>
                                                    Price : ₹ {item.price}
                                                </p>

                                            </div>

                                        </div>

                                    ))
                                }

                                <div className="order-footer">

                                    <h3>
                                        Total : ₹ {order.totalAmount}
                                    </h3>

                                    <p>
                                        Shipping Address :
                                        <br />
                                        {order.shippingAddress}
                                    </p>

                                    <p>
                                        Ordered On :
                                        {" "}
                                        {
                                            new Date(order.createdAt)
                                                .toLocaleDateString()
                                        }
                                    </p>

                                </div>

                            </div>

                        ))

                }

            </div>

        </>
    );

};

export default Orders;