import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SellerNavbar from "../SellerNavbar/SellerNavbar";
import { getDashboard } from "../../../services/sellerApi";

import "./SellerHome.css";

const SellerHome = () => {
    const [dashboard, setDashboard] = useState({
        totalBooks: 0,
        booksInStock: 0,
        totalOrders: 0,
        totalRevenue: 0
    });
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const { data } = await getDashboard();
                setDashboard(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDashboard();
    }, []);

    const chartData = [
        {
            name: "Items",
            value: dashboard.totalBooks
        },
        {
            name: "Orders",
            value: dashboard.totalOrders
        }
    ];

    return (
        <>
            <SellerNavbar />
            <div className="seller-home">
                <h1 className="welcome">
                    Welcome Seller 👋
                </h1>
                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <div className="card-icon">
                            📚
                        </div>
                        <h2>
                            {dashboard.totalBooks}
                        </h2>
                        <p>Total Items</p>
                    </div>
                    <div className="dashboard-card">
                        <div className="card-icon">
                            📦
                        </div>
                        <h2>
                            {dashboard.totalOrders}
                        </h2>
                        <p>Total Orders</p>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-icon">
                            📚
                        </div>
                        <h2>
                            {dashboard.booksInStock}
                        </h2>
                        <p>Books In Stock</p>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-icon">
                            💰
                        </div>
                        <h2>
                            ₹ {dashboard.totalRevenue}
                        </h2>
                        <p>Total Revenue</p>
                    </div>
                </div>
                <div className="chart-container">
                    <h2 className="chart-title">
                        Dashboard Overview
                    </h2>

                    <div className="chart-row">
                        <div className="chart-label">
                            📚 Items
                        </div>

                        <div className="chart-bar">
                            <div
                                className="chart-fill items"
                                style={{
                                    width: `${Math.max(dashboard.totalBooks * 10, 10)}%`
                                }}
                            />
                        </div>
                        <span className="chart-value">
                            {dashboard.totalBooks}
                        </span>
                    </div>

                    <div className="chart-row">
                        <div className="chart-label">
                            📦 Orders
                        </div>
                        <div className="chart-bar">
                            <div
                                className="chart-fill orders"
                                style={{
                                    width: `${Math.max(dashboard.totalOrders * 10, 10)}%`
                                }}
                            />
                        </div>
                        <span className="chart-value">
                            {dashboard.totalOrders}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SellerHome;