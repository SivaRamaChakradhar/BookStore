import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import Cookies from 'js-cookie'

const AdminNavbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove('user_token');
        localStorage.removeItem('role');
        navigate("/");
    };

    return (
        <nav className="user-navbar">
            <div className="logo">
                <Link to="/" className="logo-link">
                    📚 BookVerse (Admin)
                </Link>
            </div>

            <ul className="nav-links">
                <li>
                    <Link to="/admin/home">Home</Link>
                </li>
                <li>
                    <Link to="/admin/users">Users</Link>
                </li>
                <li>
                    <Link to="/admin/books">Books</Link>
                </li>
                <li>
                    <Link to="/admin/orders">Orders</Link>
                </li>
            </ul>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>
        </nav>
    );
};

export default AdminNavbar;