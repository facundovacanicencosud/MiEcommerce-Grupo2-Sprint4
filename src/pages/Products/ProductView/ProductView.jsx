import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/dataForm";
import axios from "axios";

const ProductView = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [warning, setWarning] = useState(null);

  const initialValues = {
    title: "",
    description: "",
    price: 0,
    rating: {
      rate: 0,
      count: 0,
    },
    stock: 0,
    category: "",
    images: [],
  };

  const { data, handleChange } = useForm(initialValues);

  const handleSubmit = async (e) => {
    console.log(data);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/product",
        data
      );

      if (response === 200) {
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
      setWarning("ERRORR");
    }
  };

  return (
    <>
      <div>CreateProduct</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Product title</label>
        <input
          type="text"
          name="title"
          placeholder="Product title"
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />
        <div>
          <label htmlFor="rating">Rating</label>
          <label htmlFor="rate">Rate</label>
          <input
            type="number"
            name="rate"
            placeholder="Rate"
            onChange={handleChange}
          />
          <label htmlFor="rate">Count</label>
          <input
            type="number"
            name="count"
            placeholder="Count"
            onChange={handleChange}
          />
        </div>

        <label htmlFor="rate">Stock</label>
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
        />
        <label htmlFor="rate">Category</label>
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
        />
        <div>
          <label htmlFor="images">Images</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Guardar Producto</button>
          <div>{warning && <p>{warning}</p>}</div>
        </div>
      </form>
    </>
  );
};

export default ProductView;
