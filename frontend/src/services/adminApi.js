import axiosClient from "./axiosClient";

export const getAdminDashboard = () => {
    return axiosClient.get("/admin/dashboard");
};

export const getUsers = () => {
    return axiosClient.get("/admin/users");
};

export const getOrders = () => {
    return axiosClient.get("/admin/orders");
};

export const getBooks = () => {
    return axiosClient.get("/admin/books");
};