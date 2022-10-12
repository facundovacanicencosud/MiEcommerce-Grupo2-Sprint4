import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { createProduct } from "../../../utils/apiConfig";
// import style from "../ProductView/newProductView.module.css";
import style from "./productView.module.css";

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
    if (imgStr === "" || imgStr === undefined) {
      alert("No puede enviar un link vacio");
      return;
    }
    setImages([...images, imgStr]);
    imagesInput.current.value = "";
  };

  const handleDelete = (e, i) => {
    e.preventDefault();
    const tempImg = [...images];
    tempImg.splice(i, 1);
    setImages(tempImg);
  };

  const handleSubmit = async (e) => {
    data.images = images;
    data.stock = stock;
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
          <form onSubmit={handleSubmit} className={style.productForm}>
            <div className={style.inputfield}>
              <label htmlFor="productName">
                <p>Product title</p>
              </label>
              <input
                required
                className={`${style.productForm__input_name}`}
                type="text"
                name="title"
                placeholder="Product title"
                onChange={handleChange}
              />
            </div>
            <div className={style.inputfield}>
              <label htmlFor="description">
                <p>Description</p>
              </label>
              <textarea
                className={style.textarea}
                type="text"
                name="description"
                placeholder="Description"
                onChange={handleChange}
              />
            </div>
            <div className={style.inputfield}>
              <label htmlFor="price">
                <p>Price</p>
              </label>
              <input
                required
                className={`${style.productForm__input_name} asNum`}
                type="number"
                name="price"
                placeholder="Price"
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className={style.inputfield}>
              <label htmlFor="rating">
                <p>Rating:</p>
              </label>
              <div className={style.rating_components}>
                <input
                  className={`${style.productForm__input_name}`}
                  type="number"
                  id="asNum"
                  name="rate"
                  placeholder="Rate"
                  min="0"
                  max="5"
                  step="0.01"
                  onChange={handleChange}
                />

                <input
                  className={`${style.productForm__input_name}`}
                  type="number"
                  id="asNum"
                  name="count"
                  placeholder="Count"
                  min="0"
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* <div className={style.inputfield}>
              <label htmlFor="stock"><p>Stock</p></label>
              <div className={style.stock_wrapper}>
                <button className={style.btn_stock} onClick={handleSubtractOne}>
                  {" "}
                  -{" "}
                </button>
                <input
                  required
                  className={`${style.stock_input} asNum ${style.productForm__input_name}`}
                  value={stock}
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  min="0"
                  onChange={handleChange}
                />{" "}
                <button className={style.btn_stock} onClick={handleAddOne}>
                  +
                </button>
              </div>
            </div> */}

            <div className={style.productForm__input_stock}>
              <button onClick={handleSubtractOne}> - </button>
              <input
                required
                className={`falseClass asNum`}
                value={stock}
                type="number"
                name="stock"
                placeholder="Stock"
                min="0"
                onChange={handleChange}
              />{" "}
              <button onClick={handleAddOne}> + </button>
            </div>

            <div className={style.inputfield}>
              <label htmlFor="rate">
                <p>Category</p>
              </label>
              <input
                className={`${style.productForm__input_name}`}
                type="text"
                name="category"
                placeholder="Category"
                onChange={handleChange}
              />
            </div>
            <div className={style.inputfield}>
              <label htmlFor="images">
                <p>Images</p>
              </label>
              <div className={style.upload_images}>
                <input
                  className={`${style.productForm__input_name}`}
                  ref={imagesInput}
                  type="url"
                  name="images"
                  accept="image/*"
                  placeholder="Ingrese URL de la imagen"
                />
                <button
                  onClick={sendImage}
                  className={`${style.productForm_cancel_button}`}
                >
                  Upload
                </button>
              </div>
            </div>
            <div>
              <span>Loaded:</span>
              <div className="productView_productForm__images_list">
                <ul className={style.loaded_images}>
                  {images.map((image, i) => (
                    <li className={style.list_images} key={`${image}${i}`}>
                      <img
                        className={style.create_image}
                        src={image}
                        alt={image}
                      />
                      <p className={style.img_span}>{image}</p>
                      <button
                        className={`${style.productForm_cancel_button}`}
                        onClick={(e) => handleDelete(e, i)}
                      >
                        Quitar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <button type="submit" className={`${style.btnCreateProduct}`}>
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
