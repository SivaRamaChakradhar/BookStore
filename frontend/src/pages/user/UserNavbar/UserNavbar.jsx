import { Link, useNavigate } from "react-router-dom";
import "./UserNavbar.css";
import Cookies from 'js-cookie'

const UserNavbar = () => {

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
                    📚 BookVerse
                </Link>
            </div>

            <ul className="nav-links">

                <li>
                    <Link to="/user/home">Home</Link>
                </li>

                <li>
                    <Link to="/user/books">Books</Link>
                </li>

                <li>
                    <Link to="/user/wishlist">Wishlist</Link>
                </li>

                <li>
                    <Link to="/user/cart">Cart</Link>
                </li>

                <li>
                    <Link to="/user/orders">My Orders</Link>
                </li>

                <li>
                    <Link to="/user/profile">Profile</Link>
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

export default UserNavbar;