import { Link, useNavigate } from "react-router-dom";
import "./SellerNavbar.css";
import Cookies from 'js-cookie'

const SellerNavbar = () => {

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
                    📚 BookVerse (Seller)
                </Link>
            </div>

            <ul className="nav-links">
                <li>
                    <Link to="/seller/home">Home</Link>
                </li>
                <li>
                    <Link to="/seller/books">My Products</Link>
                </li>
                <li>
                    <Link to="/seller/cart">Add Books</Link>
                </li>
                <li>
                    <Link to="/seller/orders">Orders</Link>
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

export default SellerNavbar;