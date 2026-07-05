import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { getAdminDashboard } from "../../../services/adminApi";

import "./AdminHome.css";

const AdminHome = () => {

    const [dashboard, setDashboard] = useState({
        totalUsers: 0,
        totalBooks: 0,
        totalOrders: 0,
        totalRevenue: 0
    });

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const { data } = await getAdminDashboard();
                setDashboard(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDashboard();
    }, []);

    const maxValue = Math.max(
        dashboard.totalUsers,
        dashboard.totalBooks,
        dashboard.totalOrders,
        1
    );

    return (
        <>
            <AdminNavbar />
            <div className="admin-home">
                <h1 className="welcome">
                    Welcome Admin 👋
                </h1>

                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <div className="card-icon">👥</div>
                        <h2>{dashboard.totalUsers}</h2>
                        <p>Total Users</p>
                    </div>
                    <div className="dashboard-card">
                        <div className="card-icon">📚</div>
                        <h2>{dashboard.totalBooks}</h2>
                        <p>Total Books</p>
                    </div>
                    <div className="dashboard-card">
                        <div className="card-icon">📦</div>
                        <h2>{dashboard.totalOrders}</h2>
                        <p>Total Orders</p>
                    </div>
                    <div className="dashboard-card">
                        <div className="card-icon">💰</div>
                        <h2>₹ {dashboard.totalRevenue}</h2>
                        <p>Total Revenue</p>
                    </div>
                </div>

                <div className="chart-container">
                    <h2>System Overview</h2>
                    <div className="chart-row">
                        <div className="chart-label">
                            Users
                        </div>
                        <div className="chart-bar">
                            <div
                                className="chart-fill users"
                                style={{
                                    width: `${(dashboard.totalUsers / maxValue) * 100}%`
                                }}
                            />
                        </div>
                        <span>{dashboard.totalUsers}</span>
                    </div>

                    <div className="chart-row">
                        <div className="chart-label">
                            Books
                        </div>

                        <div className="chart-bar">
                            <div
                                className="chart-fill books"
                                style={{
                                    width: `${(dashboard.totalBooks / maxValue) * 100}%`
                                }}
                            />
                        </div>
                        <span>{dashboard.totalBooks}</span>
                    </div>

                    <div className="chart-row">
                        <div className="chart-label">
                            Orders
                        </div>
                        <div className="chart-bar">
                            <div
                                className="chart-fill orders"
                                style={{
                                    width: `${(dashboard.totalOrders / maxValue) * 100}%`
                                }}
                            />
                        </div>
                        <span>{dashboard.totalOrders}</span>
                    </div>
                </div>

                <div className="quick-actions">
                    <Link
                        to="/admin/users"
                        className="action-btn"
                    >
                        Manage Users
                    </Link>
                    <Link
                        to="/admin/books"
                        className="action-btn"
                    >
                        Manage Books
                    </Link>
                    <Link
                        to="/admin/orders"
                        className="action-btn"
                    >
                        Manage Orders
                    </Link>
                </div>
            </div>
        </>
    );
};
export default AdminHome;