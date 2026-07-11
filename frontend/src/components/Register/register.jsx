import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { registerUser } from "../../services/authApi";

import Cookies from 'js-cookie';

import "./register.css";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
        confirmPassword: ""
    });

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

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        const { name, email, password, confirmPassword, role } = formData;

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        try {

            await registerUser({
                name,
                email,
                password,
                role,
            });

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Registration Failed"
            );

        }

    };

    return (

        <div className="register-container">

            <form
                className="register-form"
                onSubmit={handleSubmit}
            >

                <h1 className="form-title">
                    Create Account
                </h1>

                <p className="form-subtitle">
                    Join BookVerse and start your reading journey.
                </p>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <div className="form-group">

                    <label>Name</label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Role</label>

                    <select 
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option>seller</option>
                        <option>user</option>
                    </select>

                </div>

                <div className="form-group">

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Confirm Password</label>

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                </div>

                <button
                    type="submit"
                    className="register-btn"
                >
                    Register
                </button>

                <p className="login-link">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>

        </div>

    );

};

export default Register;