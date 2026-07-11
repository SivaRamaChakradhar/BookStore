import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from 'react'
import { getProfile } from "../../../services/authApi";


import "./SellerNavbar.css";
import Cookies from 'js-cookie'

const SellerNavbar = () => {
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
                    <Link to="/seller/add-book">Add Books</Link>
                </li>
                <li>
                    <Link to="/seller/orders">Orders</Link>
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

export default SellerNavbar;