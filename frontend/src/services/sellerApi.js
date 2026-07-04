import axiosClient from "./axiosClient";

export const getDashboard = () => {
    return axiosClient.get("/seller/dashboard");
};

export const getSellerBooks = () => {
    return axiosClient.get("/seller/books");
};

export const getSellerOrders = () => {
    return axiosClient.get("/seller/orders");
};