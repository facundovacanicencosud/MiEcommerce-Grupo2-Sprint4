import axios from "axios";
const baseUrl = "http://localhost:5000/api";

//Products api
export const getProducts = async () => {
  return axios.get(`${baseUrl}/product`);
};

export const getProduct = async (id) => {
  return axios.get(`${baseUrl}/product/${id}`);
};

export const putProduct = async (data) => {
  return axios.put(`${baseUrl}/product`, data);
};

export const createProduct = (data) => {
  return axios.post(`${baseUrl}/product`, data);
};

export const deleteProduct = (id) => {
  return axios.delete(`${baseUrl}/product?id=${id}`);
};

//Users api
export const getUsers = async () => {
  return axios.get(`${baseUrl}/user`);
};
