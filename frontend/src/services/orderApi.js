import axiosClient from "./axiosClient";

export const createOrder = (data) => {
    return axiosClient.post("/orders", data);
};

export const getMyOrders = () => {
    return axiosClient.get("/orders");
};

export const getOrder = (id) => {
    return axiosClient.get(`/orders/${id}`);
};