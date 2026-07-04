import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import UserNavbar from "../UserNavbar/UserNavbar";
import { getProfile } from "../../../services/authApi";

import "./Profile.css";

const Profile = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const fetchProfile = async () => {

        try {

            const { data } = await getProfile();

            setUser(data.user);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const logout = () => {

        Cookies.remove("user_token");

        navigate("/login");

    };

    if (!user) {

        return (
            <>
                <UserNavbar />
                <h2 className="loading">
                    Loading...
                </h2>
            </>
        );

    }

    return (

        <>
            <UserNavbar />
            <div className="profile-container">
                <div className="profile-card">
                    <div className="avatar">
                        {user.name.charAt(0).toUpperCase()}
                    </div>

                    <h1>
                        {user.name}
                    </h1>

                    <p className="role">
                        {user.role.toUpperCase()}
                    </p>

                    <div className="profile-details">
                        <div className="detail">
                            <span>Name</span>
                            <h3>{user.name}</h3>
                        </div>
                        <div className="detail">
                            <span>Email</span>
                            <h3>{user.email}</h3>
                        </div>
                        <div className="detail">
                            <span>Role</span>
                            <h3>{user.role}</h3>
                        </div>
                        <div className="detail">
                            <span>Joined</span>
                            <h3>
                                {
                                    new Date(user.createdAt)
                                        .toLocaleDateString()
                                }
                            </h3>
                        </div>
                    </div>
                    <button
                        className="logout-profile-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Profile;