import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = () => {
    const token = Cookies.get("user_token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Outlet />;
    }

    switch (role) {
        case "user":
            return <Navigate to="/user/home" replace />;

        case "seller":
            return <Navigate to="/seller/home" replace />;

        case "admin":
            return <Navigate to="/admin/home" replace />;

        default:
            return <Navigate to="/" replace />;
    }
};

export default PublicRoute;