import { useState, useEffect } from 'react';

import {useLocation, Navigate} from 'react-router-dom'

import { loginUser } from '../../services/authApi';

import Cookies from 'js-cookie';

import { Link, useNavigate } from 'react-router-dom';

import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("user_token");
        const role = localStorage.getItem("role");
        if (!token) return;
        let target = "/";
        switch (role) {
            case "user":
                target = "/user/home";
                break;
            case "seller":
                target = "/seller/home";
                break;
            case "admin":
                target = "/admin/home";
                break;
            default:
                return;
        }
        if (location.pathname !== target) {
            navigate(target, { replace: true });
        }
    }, [navigate, location.pathname]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await loginUser({
                email,
                password,
            });

            Cookies.set('user_token', data.token, { expires: 30 });
            localStorage.setItem("role", data.user.role);
            const role = data.user.role;

            switch (role) {
                case "user":
                    navigate("/user/home");
                    break;

                case "seller":
                    navigate("/seller/home");
                    break;

                case "admin":
                    navigate("/admin/home");
                    break;

                default:
                    navigate("/");
            }
        } catch (error) {
            console.error(error.response?.data?.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="form-title">Welcome Back</h1>

                <p className="form-subtitle">
                    Sign in to continue to BookVerse
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>
                <p className='register-link'>Don't have an account? <Link to="/register">Register</Link> </p>
            </div>
        </div>
    )
}

export default Login;