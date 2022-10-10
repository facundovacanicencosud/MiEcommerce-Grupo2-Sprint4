import axios from "axios";
const baseUrl = "http://localhost:5000/api";

//Products api
export const getProducts = async () => {
  return axios.get(`${baseUrl}/product`);
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

export const deleteUser = (id) => {
  return axios.delete(`${baseUrl}/user?id=${id}`);
};
