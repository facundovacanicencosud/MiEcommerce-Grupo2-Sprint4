import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import axios from "axios";
import style from "./productView.module.css";
import profileIcon from "../../../assets/ProfileBtn.svg";

const ProductView = () => {
  const baseURL = "http://localhost:5000/api";
  const navigate = useNavigate();
  const id = useParams().id;
  const [product, setProduct] = useState();
  const [image, setImage] = useState([]);
  const [currentStock, setCurrentStock] = useState(0);
  const imagesInput = useRef(null);
  const inputPrice = useRef();
  const formRef = useRef();

  useEffect(() => {
    axios.get(`${baseURL}/product/${id}`).then((response) => {
      setProduct(response.data);
      setImage(response.data.images);
      setCurrentStock(response.data.stock);
    });
  }, []);

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
        stock: currentStock,
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
    setCurrentStock(currentStock - 1);
  };

  const handleAddOne = (e) => {
    e.preventDefault();
    setCurrentStock(currentStock + 1);
  };

  const addImg = (e) => {
    e.preventDefault();
    const imgStr = imagesInput.current.value;
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
      <div className={style.container}>
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
        <form onSubmit={updateProduct} className="productForm" ref={formRef}>
          <label htmlFor="nombre">Nombre</label>
          <br />
          <input
            required
            defaultValue={product.title}
            onChange={handleChange}
            className={style.inputs}
            type="text"
            name="title"
            placeholder="Titulo"
          />{" "}
          <br />
          <label htmlFor="price">Price</label> <br />
          <input
            required
            onChange={handleChange}
            defaultValue={product.price}
            className={`${style.inputs} asNum`}
            ref={inputPrice}
            type="number"
            name="price"
            min="0"
            placeholder="Precio"
          />
          <br />
          <label htmlFor="stock">Stock</label>
          <br />
          <div>
            <button onClick={handleSubtractOne}> - </button>
            <input
              required
              onChange={handleChange}
              value={currentStock}
              className={`${style.inputs} asNum`}
              type="number"
              name="stock"
              min="0"
              placeholder="Stock"
            />
            <button onClick={handleAddOne}> + </button>
          </div>
          <div>
            <label htmlFor="descripcion">Descripción</label>
            <br />
            <textarea
              onChange={handleChange}
              defaultValue={product.description}
              className={style.description}
              type="text"
              name="description"
              placeholder="Descripcion del producto"
            />
            <br />
            <br />
            <label htmlFor="tienda">Tienda</label>
            <br />
            <select
              className={style.inputs}
              type="text"
              name="category"
              placeholder="Select"
            >
              <option>Pepito store</option>
            </select>
          </div>
          <h3 className={style.headings}>Galería de Imágenes</h3>
          <div>
            <label htmlFor="imagen">Nueva Imagen</label>
            <br />
            <input
              ref={imagesInput}
              className={style.inputs}
              type="url"
              name="images"
              accept="image/*"
              placeholder="Ingrese URL de la imagen"
            />{" "}
            <button onClick={addImg}>Agregar imagen</button>
          </div>
          <h4 className={style.headings}>Imágenes Actuales</h4>
          <div className={style.imageBanner}>
            <ul>
              {image.map((img, i) => (
                <li key={`${img}${i}`}>
                  <img src={img} alt={img} />
                  <p>{img}</p>
                  <button onClick={(e) => deleteImgActuales(e, i)}>
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit">Guardar</button>
          <div>
            <button onClick={resetInputs}>CANCELAR</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductView;
