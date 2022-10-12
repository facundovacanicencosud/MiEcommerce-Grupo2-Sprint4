import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import axios from "axios";
import style from "./productView.module.css";
import profileIcon from "../../../assets/ProfileBtn.svg";

const ProductView = () => {
  const baseURL = "http://localhost:5000/api";
  const id = useParams().id;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/product/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, []);

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
        stock: stonk,
        description: data.description,
      })
      .then((response) => {
        setProduct(response.data);
      });
  };

  const [stockNum, setStockNum] = useState(stonk);
  const handleSubtractOne = () => {
    setStockNum(stockNum - 1);
  };

  const handleAddOne = () => {
    setStockNum(stockNum + 1);
  };

  const [image, setImage] = useState([]);
  const handleChanges = (e) => {
    setImage(e.target.value);
  };

  const addImg = () => {
    axios
      .put(`${baseURL}/product`, {
        images: [...product.images, image],
        id: product.id,
      })
      .then((response) => {
        setImage(response.data);
      });
    alert("Imagen agregada.");
  };

  const deleteImg = () => {
    axios
      .put(`${baseURL}/product`, {
        /*"images": [image],*/
        id: product.id,
      })
      .then((response) => {
        setImage(response.data);
      });
    alert("Imagen borrada!");
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

  const imageList = product.images.map((img) => (
    <div>
      <img src={img} key={img} alt={product.title} />
      <p>{img}</p>
      <button onClick={deleteImg}>Quitar</button>
    </div>
  ));

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
        <form onSubmit={updateProduct} className="productForm">
          <label htmlFor="nombre">Nombre</label>
          <br />
          <input
            required
            defaultValue={initialValues.title}
            onChange={handleChange}
            className={style.inputs}
            type="text"
            name="title"
            placeholder="InputValue"
          />{" "}
          <br />
          <label htmlFor="valor">Valor</label> <br />
          <input
            onChange={handleChange}
            defaultValue={initialValues.price}
            className={style.inputs}
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
              defaultValue={initialValues.stock}
              className={style.inputs}
              type="number"
              name="stock"
              placeholder="InputValue"
            />
            <button onClick={handleAddOne}> + </button>
          </div>
          <div>
            <label htmlFor="descripcion">Descripción</label>
            <br />
            <input
              onChange={handleChange}
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
          <button type="submit">Guardar</button>
        </form>

        <h3 className={style.headings}>Galería de Imágenes</h3>
        <div>
          <label htmlFor="imagen">Nueva Imagen</label>
          <br />
          <input
            onChange={handleChanges}
            className={style.inputs}
            type="text"
            name="imagen"
            accept="image/*"
            placeholder="InputValue"
          />{" "}
          <button onClick={addImg}>Agregar imagen</button>
        </div>
        <h4 className={style.headings}>Imágenes Actuales</h4>
        <div className={style.imageBanner}>{imageList}</div>
        <br />
        <div>
          <button onClick={resetInputs}>CANCELAR</button>
        </div>
      </div>
    </>
  );
};

export default ProductView;
