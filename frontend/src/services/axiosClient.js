import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get("user_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

console.log(import.meta.env.VITE_API_URL);

export default axiosClient;