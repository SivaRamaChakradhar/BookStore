import { useEffect, useState } from "react";
import UserNavbar from "../UserNavbar/UserNavbar";
import { getMyOrders } from "../../../services/orderApi";
import "./Orders.css";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    
    const fetchOrders = async () => {
        try {
            const { data } = await getMyOrders();
            // Fallback to empty array if data.orders is missing
            setOrders(data?.orders || []); 
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
                <h1 className="orders-title">My Orders</h1>

                {orders.length === 0 ? (
                    <h2 className="empty">No Orders Found</h2>
                ) : (
                    orders.map(order => (
                        <div className="order-card" key={order._id}>
                            <div className="order-header">
                                <div>
                                    <h3>Order ID</h3>
                                    <p>{order._id}</p>
                                </div>
                                {/* Added optional chaining below */}
                                <span className={`status ${order.orderStatus?.toLowerCase() || ''}`}>
                                    {order.orderStatus}
                                </span>
                            </div>

                            <hr />

                            {/* Added optional chaining on items loop */}
                            {order.items?.map(item => (
                                // Added optional chaining to prevent crash if bookId is unpopulated
                                <div className="order-item" key={item.bookId?._id || item._id}>
                                    <img
                                        src={item.bookId?.itemImage || "fallback-image-url.png"}
                                        alt={item.bookId?.title || "Unknown Book"}
                                    />

                                    <div className="book-info">
                                        <h2>{item.bookId?.title || "Deleted Book"}</h2>
                                        <p>{item.bookId?.author || "Unknown Author"}</p>
                                        <p>Quantity : {item.quantity}</p>
                                        <p>Price : ₹ {item.price}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="order-footer">
                                <h3>Total : ₹ {order.totalAmount}</h3>
                                <p>
                                    Shipping Address :
                                    <br />
                                    {order.shippingAddress}
                                </p>
                                <p>
                                    Ordered On :{" "}
                                    {order.createdAt 
                                        ? new Date(order.createdAt).toLocaleDateString() 
                                        : "N/A"
                                    }
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default Orders;