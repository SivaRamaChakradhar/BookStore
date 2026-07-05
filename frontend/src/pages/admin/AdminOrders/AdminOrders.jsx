import { useEffect, useState } from "react";

import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { getAllOrders } from "../../../services/adminApi";

import "./AdminOrders.css";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await getAllOrders();
                setOrders(data.orders);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <>
            <AdminNavbar />
            <div className="admin-orders-container">
                <h1>Manage Orders</h1>
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
                                        <h2>
                                            {order.userId?.name}
                                        </h2>
                                        <p>
                                            {order.userId?.email}
                                        </p>
                                    </div>
                                    <span className={`status ${order.orderStatus.toLowerCase()}`}>
                                        {order.orderStatus}
                                    </span>
                                </div>
                                <p className="address">
                                    <strong>Shipping Address:</strong> {order.shippingAddress}
                                </p>
                                <div className="items">
                                    {
                                        order.items.map(item => (
                                            <div
                                                className="item"
                                                key={item._id}
                                            >
                                                <div>
                                                    <h3>
                                                        {item.bookId?.title}
                                                    </h3>
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
                                </div>
                                <div className="footer">
                                    <h3>
                                        Total : ₹ {order.totalAmount}
                                    </h3>
                                </div>
                            </div>
                        ))
                }
            </div>
        </>
    );
};

export default AdminOrders;