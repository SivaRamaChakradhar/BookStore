import axiosClient from "./axiosClient";

export const getBooks = () => {
    return axiosClient.get("/books");
};

export const getBook = (id) => {
    return axiosClient.get(`/books/${id}`);
};

export const createBook = (data) => {
    return axiosClient.post("/seller/books", data);
};

export const updateBook = (id, data) => {
    return axiosClient.put(`/seller/books/${id}`, data);
};

export const deleteBook = (id) => {
    return axiosClient.delete(`/seller/books/${id}`);
};