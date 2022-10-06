import axios from "axios";
const baseUrl = "http://localhost:5000/api";

export const getProducts = async () => {
  return axios.get(`${baseUrl}/product`);
};

export const createProduct = (data) => {
  return axios.post(`${baseUrl}/product`, data);
};
