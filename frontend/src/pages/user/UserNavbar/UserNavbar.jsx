import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { getProfile } from "../../../services/authApi";

import "./UserNavbar.css";
import Cookies from 'js-cookie'

const UserNavbar = () => {
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('user_token');
        localStorage.removeItem('role');
        navigate("/");
    };

    useEffect(() => {
        const fetchUser = async() => {
            try{
                const {data} = await getProfile();
                setUser(data.user);
            }
            catch(e){
                console.log(e);
            }
        }
        fetchUser();
    }, [])

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

            <div className="user-info">
                <button
                    onClick={handleLogout}
                    className="logout-btn"
                >
                    Logout
                </button>
                <span>
                    👋 {user.name}
                </span>
            </div>
        </nav>
    );
};

export default UserNavbar;