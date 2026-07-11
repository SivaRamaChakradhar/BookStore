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

export const deleteBook = (id) => {
    return axiosClient.delete(`/seller/books/${id}`);
}

export const updateBook = (id) => {
    return axiosClient.put(`/seller/books/${id}`);
}