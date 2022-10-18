import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import axios from "axios";
import style from "./productView.module.css";
import profileIcon from "../../../assets/ProfileBtn.svg";
import confirmTic from "../../../assets/confirm-tic.svg";
import { AppContext } from "../../../context/AppContext";

const ProductView = () => {
  const baseURL = "http://localhost:5000/api";
  const navigate = useNavigate();
  const id = useParams().id;
  const [product, setProduct] = useState();
  const [image, setImage] = useState([]);
  const { theme } = useContext(AppContext);
  const imagesInput = useRef(null);
  const inputPrice = useRef();
  const formRef = useRef();

  useEffect(() => {
    axios.get(`${baseURL}/product/${id}`).then((response) => {
      setProduct(response.data);
      setImage(response.data.images);
    });
  }, [id]);

  const initialValues = {
    ...product,
  };
  const { data, handleChange } = useForm(initialValues);
  const updateProduct = (e) => {
    e.preventDefault();

    axios
      .put(`${baseURL}/product`, {
        id: product.id,
        title: data.title,
        price: parseInt(inputPrice.current.value),
        stock: data.stock,
        description: data.description,
        images: image,
      })
      .then((response) => {
        setProduct(response.data);
        navigate("/products");
      });
  };

  const handleSubtractOne = (e) => {
    e.preventDefault();
    setProduct({ ...product, stock: parseInt(product.stock) - 1 });
  };

  const handleAddOne = (e) => {
    e.preventDefault();
    setProduct({ ...product, stock: parseInt(product.stock) + 1 });
  };

  const addImg = (e) => {
    e.preventDefault();
    const imgStr = imagesInput.current.value;
    if (imgStr === "" || imgStr === undefined) {
      alert("No puede subir una url vacia");
      return;
    }
    setImage([...image, imgStr]);
    imagesInput.current.value = "";
  };

  const deleteImgActuales = (e, i) => {
    e.preventDefault();
    const actuales = [...image];
    actuales.splice(i, 1);
    setImage(actuales);
  };

  if (!product) return "No existe este producto.";

  const resetInputs = (e) => {
    e.preventDefault();
    formRef.current.title.value = initialValues.title;
    formRef.current.price.value = initialValues.price;
    formRef.current.stock.value = initialValues.stock;
    formRef.current.description.value = initialValues.description;
    setImage(initialValues.images);
  };

  return (
    <>
      <div className={style.productView_container}>
        <div className={style.products}>
          <div className={style.products_img}>
            <img src={product.images[0]} alt={product.title} />
          </div>
          <div className={style.product_info}>
            <div className={style.product_info__title}>
              <h2>{product.title}</h2>
            </div>
            <div className={style.product_info__detail}>
              <div className={style.product_info_detail__price}>
                <h1>{product.price}</h1>
                <p>Puntos Superclub</p>
              </div>
              <div className={style.product_info_detail__stock}>
                <div className="">
                  <h1>{product.stock}</h1>
                </div>
                <div className="">
                  <p>Stock Disponible</p>
                </div>
              </div>
              <div className={style.product_info_detail__user}>
                <img src={profileIcon} alt="Perfil del usuario" />
                <div className={style.product_info_detail__user_name}>
                  <p>Olivia Store</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className={style.headings}>Información</h2>

        <form
          onSubmit={updateProduct}
          className={style.productForm}
          ref={formRef}
        >
          <label htmlFor="title">
            <p>Nombre</p>
          </label>
          <input
            required
            defaultValue={product.title}
            onChange={(e) => {
              handleChange(e);
              setProduct({ ...product, title: e.target.value });
            }}
            className={style.productForm__input_name}
            type="text"
            name="title"
            placeholder="Titulo"
          />{" "}
          <label htmlFor="price">
            <p>Price</p>
          </label>
          <input
            required
            onChange={(e) => {
              handleChange(e);
              setProduct({ ...product, price: e.target.value });
            }}
            defaultValue={product.price}
            className={`${style.productForm__input_value} asNum`}
            ref={inputPrice}
            type="number"
            name="price"
            min="0"
            placeholder="Precio"
          />
          <label htmlFor="stock">
            <p>Stock</p>
          </label>
          <div>
            <div className={style.productForm__input_stock}>
              <button onClick={handleSubtractOne}> - </button>
              <input
                required
                onChange={(e) => {
                  handleChange(e);
                  setProduct({ ...product, stock: e.target.value });
                }}
                value={product.stock}
                className={`falseClass asNum`}
                type="number"
                name="stock"
                min="0"
                placeholder="Stock"
              />
              <button onClick={handleAddOne}> + </button>
            </div>
          </div>
          <div>
            <label htmlFor="descripcion">
              <p>Descripción</p>
            </label>

            <textarea
              onChange={handleChange}
              defaultValue={product.description}
              className={style.productForm__input_description}
              type="text"
              name="description"
              placeholder="Descripcion del producto"
            />

            <label htmlFor="tienda">
              <p>Tienda</p>
            </label>

            <select
              className={style.productForm__input_store}
              type="text"
              name="category"
              placeholder="Select"
            >
              <option>MiEcommerce</option>
            </select>
          </div>
          <h2 className={style.headings}>Galería de Imágenes</h2>
          <div>
            <label htmlFor="imagen">
              <p>Nueva Imagen</p>
            </label>
            <input
              ref={imagesInput}
              className={style.productForm__input_img}
              type="url"
              name="images"
              accept="image/*"
              placeholder="Ingrese URL de la imagen"
            />{" "}
            <button
              onClick={addImg}
              className={style.productForm__add_image_button}
            >
              <img
                src={confirmTic}
                className={theme ? style.dark : ""}
                alt="Agregar Imagen"
              />
            </button>
          </div>
          <label htmlFor="new-images">
            <p>Imágenes Actuales</p>
          </label>
          <div className={style.productForm__images_list}>
            <ul>
              {image.map((img, i) => (
                <li
                  key={`${img}${i}`}
                  className={style.productForm__images_list__image_card}
                >
                  <img src={img} alt={img} />
                  <p>{img}</p>
                  <button onClick={(e) => deleteImgActuales(e, i)}>
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.productForm_buttons_container}>
            <button type="submit" className={style.productForm_save_button}>
              Guardar
            </button>
            <button
              onClick={resetInputs}
              className={style.productForm_cancel_button}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductView;
