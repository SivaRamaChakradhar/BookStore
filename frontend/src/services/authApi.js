import axiosClient from "./axiosClient";

export const registerUser = (data) => {
    return axiosClient.post("/users/register", data);
};

export const loginUser = (data) => {
    return axiosClient.post("/users/login", data);
};

export const getProfile = () => {
    return axiosClient.get("/users/profile");
};