import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePutForm from "../../../hooks/usePutForm";
import useForm from "../../../hooks/useForm";
import axios from "axios";
import style from "./productView.module.css";
import { modifyProduct } from "../../../utils/apiConfig";
import profileIcon from "../../../assets/ProfileBtn.svg";


const ProductView = () => {
  const baseURL = "http://localhost:5000/api";
  const navigate = useNavigate();
  const id = useParams().id;
  const [product, setProduct] = useState();
  const [image, setImage] = useState([]);
  const [fer, setFer] = useState([]);
  const [currentStock, setCurrentStock] = useState(0);
  const imagesInput = useRef(null);

  useEffect(() => {
    axios.get(`${baseURL}/product/${id}`).then((response) => {
      setProduct(response.data);
      setFer(response.data.images);
      setCurrentStock(response.data.stock);
    });
  }, []);
  console.log(product);

  const initialValues = {
    ...product,
  };

  const { data, handleChange } = useForm(initialValues);

  const precio = parseInt(data.price);
  const stonk = parseInt(data.stock);

  const updateProduct = (e) => {
    e.preventDefault();
    /*let datas = new FormData(e.target);
    datas.append('id', product.id)*/

    /*function replace(key, value) {
      if (key === 'id' || key === 'stock' || key === 'price') {
        let change = Number(value);
        return change;
      }
      return value;
    }
    let formObject = JSON.stringify(Object.fromEntries(datas), replace)*/
    axios
      .put(`${baseURL}/product`, {
        id: product.id,
        title: data.title,
        price: precio,
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
    const actuales = [...fer];
    actuales.splice(i, 1);
    setImage(actuales);
  };

  // const deleteProduct = () => {
  //   axios.delete(`${baseURL}/product?id=${id}`).then(() => {
  //     alert("Producto borrado.");
  //     setProduct(null);
  //   });
  // };

  if (!product) return "No existe este producto.";

  const resetInputs = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  /*   const handleSubmit = async (e) => {
    data.stock = currentStock;
    data.images = fer;
    console.log(data);
    e.preventDefault();
    try {
      const response = await modifyProduct(data);
      if (response.status === 201) {
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
    }
  }; */

  return (
    <>
      <div className={style.container}>
        <div className={style.products}>
          <div className="products_img">
            <img src={product.images[0]} alt={product.title} />
          </div>
          <div className="product_info">
            <div className="product_info__title">
              <h2>{product.title}</h2>
            </div>
            <div className="product_info__detail">
              <div className="product_info_detail__price">
                <h4>{product.price}</h4>
                <p>Puntos Superclub</p>
              </div>
              <div className="product_info_detail__stock">
                <h4>{product.stock}</h4>
                <p>Stock Disponible</p>
              </div>
              <div className="product_info_detail__user">
                  <img src={profileIcon} alt="" />
              </div>
            </div>
          </div>
        </div>

        <h2 className={style.headings}>Información</h2>
        <form onSubmit={updateProduct} className="productForm">
          <label htmlFor="nombre">Nombre</label>
          <br />
          <input
            required
            defaultValue={product.title}
            onChange={handleChange}
            className={style.inputs}
            type="text"
            name="title"
            placeholder="InputValue"
          />{" "}
          <br />
          <label htmlFor="price">Price</label> <br />
          <input
            onChange={handleChange}
            defaultValue={product.price}
            className={`${style.inputs} asNum`}
            type="number"
            name="price"
            placeholder="InputValue"
          />
          <br />
          <label htmlFor="stock">Stock</label>
          <br />
          <div>
            <button onClick={handleSubtractOne}> - </button>
            <input
              onChange={handleChange}
              value={currentStock}
              className={`${style.inputs} asNum`}
              type="number"
              name="stock"
              placeholder="InputValue"
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
              placeholder="InputValue"
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
