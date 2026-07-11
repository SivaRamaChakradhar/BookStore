import axiosClient from "./axiosClient";

export const getAdminDashboard = () => {
    return axiosClient.get("/admin/dashboard");
};

export const getUsers = () => {
    return axiosClient.get("/admin/users");
};

export const getAllOrders = () => {
    return axiosClient.get("/admin/orders");
};

export const getBooks = () => {
    return axiosClient.get("/admin/books");
};

export const deleteUser = (id) => {
    return axiosClient.delete(`/admin/users/${id}`);
}

export const deleteBook = (id) => {
    return axiosClient.delete(`/admin/books/${id}`);
}