import axios from "axios";
const baseUrl = "http://localhost:5000/api";

export const getProducts = async () => {
  const response = await axios.get(`${baseUrl}/product`);
  return response;
};
