import axiosClient from "./axiosClient";

export const getCart = () => {
    return axiosClient.get("/cart");
};

export const addToCart = (data) => {
    return axiosClient.post("/cart", data);
};

export const updateCart = (id, data) => {
    return axiosClient.put(`/cart/${id}`, data);
};

export const removeFromCart = (id) => {
    return axiosClient.delete(`/cart/${id}`);
};