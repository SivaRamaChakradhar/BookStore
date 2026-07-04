import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ allowedRole }) => {

    const token = Cookies.get("user_token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role !== allowedRole) {

        switch (role) {

            case "user":
                return <Navigate to="/user/home" replace />;

            case "seller":
                return <Navigate to="/seller/home" replace />;

            case "admin":
                return <Navigate to="/admin/home" replace />;

            default:
                return <Navigate to="/login" replace />;
        }

    }

    return <Outlet />;
};

export default ProtectedRoute;