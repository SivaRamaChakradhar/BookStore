import axiosClient from "./axiosClient";

export const getWishlist = () => {
    return axiosClient.get("/wishlist");
};

export const addToWishlist = (data) => {
    return axiosClient.post("/wishlist", data);
};

export const removeWishlist = (id) => {
    return axiosClient.delete(`/wishlist/${id}`);
};