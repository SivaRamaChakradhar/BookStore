import { useEffect, useState } from "react";

import SellerNavbar from "../SellerNavbar/SellerNavbar";
import { getSellerOrders } from "../../../services/sellerApi";

import "./SellerOrder.css";

const SellerOrder = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await getSellerOrders();
                setOrders(data.orders);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <>
            <SellerNavbar />
            <div className="seller-orders-container">
                <h1>Seller Orders</h1>
                {
                    orders.length === 0 ?
                        <div className="empty-orders">
                            <h2>No Orders Found</h2>
                        </div>
                        :
                        orders.map(order => (
                            <div
                                className="order-card"
                                key={order._id}
                            >
                                <div className="order-header">
                                    <div>
                                        <h3>{order.customer.name}</h3>
                                        <p>{order.customer.email}</p>
                                    </div>
                                    <span className={`status ${order.orderStatus.toLowerCase()}`}>
                                        {order.orderStatus}
                                    </span>
                                </div>

                                <p className="address">
                                    <strong>Shipping:</strong> {order.shippingAddress}
                                </p>

                                <div className="items">

                                    {
                                        order.items.map(item => (

                                            <div
                                                className="item"
                                                key={item._id}
                                            >

                                                <img
                                                    src={item.bookId.itemImage}
                                                    alt={item.bookId.title}
                                                />

                                                <div>

                                                    <h4>{item.bookId.title}</h4>

                                                    <p>
                                                        Quantity : {item.quantity}
                                                    </p>

                                                    <p>
                                                        Price : ₹{item.price}
                                                    </p>

                                                </div>

                                            </div>

                                        ))
                                    }

                                </div>

                            </div>

                        ))

                }

            </div>

        </>
    );

};

export default SellerOrder;