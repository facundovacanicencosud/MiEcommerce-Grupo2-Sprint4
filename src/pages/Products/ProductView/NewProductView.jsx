import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { createProduct } from "../../../utils/apiConfig";
import style from "../ProductView/newProductView.module.css";

const NewProductView = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [warning, setWarning] = useState(null);
  const [stock, setStock] = useState(0);
  const imagesInput = useRef(null);

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
  const handleAddOne = (e) => {
    e.preventDefault();
    setStock(stock + 1);
  };
  const handleSubtractOne = (e) => {
    e.preventDefault();
    setStock(stock - 1);
  };

  const sendImage = (e) => {
    e.preventDefault();
    const imgStr = imagesInput.current.value;
    setImages([...images, imgStr]);
    imagesInput.current.value = "";
  };

  const handleDelete = (e,i) => {
    e.preventDefault();
    const tempImg = [...images];
    tempImg.splice(i, 1);
    setImages(tempImg);
  };

  const handleSubmit = async (e) => {
    data.images = images;
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
              <div className={style.rating_components}>
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
              <label htmlFor="stock">Stock</label>
              <div className={style.stock_wrapper}>
                <button className={style.btn_stock} onClick={handleSubtractOne}>
                  {" "}
                  -{" "}
                </button>
                <input
                  className={`${style.stock_input} asNum`}
                  value={stock}
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  onChange={handleChange}
                />{" "}
                <button className={style.btn_stock} onClick={handleAddOne}>
                  +
                </button>
              </div>
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
              <div className={style.upload_images}>
                <input
                  className={style.input}
                  ref={imagesInput}
                  type="url"
                  name="images"
                  accept="image/*"
                  placeholder="Ingrese URL de la imagen"
                />
                <button onClick={sendImage} className={style.quitar_img_prod}>
                  Upload
                </button>
              </div>
            </div>
            <div>
              <span>Loaded:</span>
              <div>
                <ul className={style.loaded_images}>
                  {images.map((image, i) => (
                    <li className={style.list_images} key={i}>
                      <img
                        className={style.create_image}
                        src={image}
                        alt={image}
                      />
                      <p>{image}</p>
                      <button
                        className={style.quitar_img_prod}
                        onClick={(e) => handleDelete(e,i)}
                      >
                        Quitar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
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
