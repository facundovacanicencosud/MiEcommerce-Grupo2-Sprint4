import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { createProduct } from "../../../utils/apiConfig";
import style from "../ProductView/newProductView.module.css";

const NewProductView = () => {
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
      const response = await createProduct(data);
      if (response.status === 201) {
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
      setWarning("Hay un error !!!");
    }
  };

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.title}>Create Product</div>
        <div className={style.form}>
          <form onSubmit={handleSubmit}>
            <div className={style.inputfield}>
              <label htmlFor="productName">Product title</label>
              <input
                className={style.input}
                type="text"
                name="title"
                placeholder="Product title"
                onChange={handleChange}
              />
            </div>
            <div className={style.inputfield}>
              <label htmlFor="description">Description</label>
              <textarea
                className={style.textarea}
                type="text"
                name="description"
                placeholder="Description"
                onChange={handleChange}
              />
            </div>
            <div className={style.inputfield}>
              <label htmlFor="price">Price</label>
              <input
                className={`${style.input} asNum`}
                type="number"
                name="price"
                placeholder="Price"
                onChange={handleChange}
              />
            </div>

            <div className={style.inputfield}>
              <label htmlFor="rating">Rating:</label>
              <div className={style.ratingComponents}>
                <input
                  className={style.input}
                  type="number"
                  id="asNum"
                  name="rate"
                  placeholder="Rate"
                  onChange={handleChange}
                />

                <input
                  className={style.input}
                  type="number"
                  id="asNum"
                  name="count"
                  placeholder="Count"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={style.inputfield}>
              <label htmlFor="rate">Stock</label>
              <input
                className={`${style.input} asNum`}
                type="number"
                name="stock"
                placeholder="Stock"
                onChange={handleChange}
              />
            </div>
            <div className={style.inputfield}>
              <label htmlFor="rate">Category</label>
              <input
                className={style.input}
                type="text"
                name="category"
                placeholder="Category"
                onChange={handleChange}
              />
            </div>
            <div className={style.inputfield}>
              <label htmlFor="images">Images</label>
              <input
                className={style.input}
                type="text"
                name="images"
                accept="image/*"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className={style.btnCreateProduct}>
                <span>Guardar Producto</span>
              </button>
              <div>{warning && <p>{warning}</p>}</div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProductView;
