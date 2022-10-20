import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import style from "./productView.module.css";
import profileIcon from "../../../assets/ProfileBtn.svg";
import confirmTic from "../../../assets/confirm-tic.svg";
import { AppContext } from "../../../context/AppContext";
import { deleteProduct, getProduct, putProduct } from "../../../utils/apiConfig";
import noImage from "../../../assets/no-image.svg";

const ProductView = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [product, setProduct] = useState();
  const [productView, setProductView] = useState();
  const [image, setImage] = useState([]);
  const { theme, deleting, setDeleting } = useContext(AppContext);
  const imagesInput = useRef(null);
  const inputPrice = useRef();
  const formRef = useRef();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await getProduct(id);
      setProduct(data);
      setProductView(data);
      setImage(data.images);
    };
    fetchProduct();
  }, [id]);

  const initialValues = {
    ...product,
  };
  const { data, handleChange } = useForm(initialValues);


  //función para borrar un producto
  const handleDelete = async () => {
    try {
      const deletedProduct = await deleteProduct(parseInt(id));
      if (deletedProduct.status === 200) {
        navigate("/products");
      } else {
        alert("Se produjo un error");
      }
    } catch (error) {
      console.log(error);
    }
    setDeleting(false);
  };


  const updateProduct = async (e) => {
    e.preventDefault();
    const response = await putProduct({
      id: product.id,
      title: data.title,
      price: parseInt(inputPrice.current.value),
      stock: parseInt(productView.stock),
      description: data.description,
      images: image,
    });
    setProduct(response.data);
    navigate("/products");
  };

  const handleSubtractOne = (e) => {
    e.preventDefault();
    // setProduct({ ...product, stock: parseInt(product.stock) - 1 });
    if(productView.stock<= 0){
      setProductView({ ...productView, stock: parseInt(productView.stock) });
    }else{
      setProductView({ ...productView, stock: parseInt(productView.stock) - 1 });
    }
  };

  const handleAddOne = (e) => {
    e.preventDefault();
    // setProduct({ ...product, stock: parseInt(product.stock) + 1 });
    setProductView({ ...productView, stock: parseInt(productView.stock) + 1 });
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

  const keyPressFunction = (e) =>{
    if(e.target.value[0] === "0"){
      e.target.value = e.target.value[1];
    }
  }

  if (!product) return "No existe este producto.";

  const resetInputs = (e) => {
    e.preventDefault();
    formRef.current.title.value = initialValues.title;
    formRef.current.price.value = initialValues.price;
    formRef.current.stock.value = initialValues.stock;
    formRef.current.description.value = initialValues.description;
    setImage(initialValues.images);
    setProductView({ ...productView, ...initialValues });
  };

  return (
    <>
      {deleting? 
      <>
        <div className={style.modal_delete_background}>
          <div className={style.modal_delete_options}>
            <h3>Estás seguro que quieres eliminar este producto?</h3>
            <div>
              <button onClick={()=>setDeleting(false)}>Cancelar</button>
              <button onClick={handleDelete}>Eliminar</button>

            </div>
          </div>
        </div>
      </>: ""}
      <div className={style.productView_container}>
        <div className={style.products}>
          <div className={style.products_img}>
            <img src={image.length?image[0]: noImage} alt={product.title} />
          </div>
          <div className={style.product_info}>
            <div className={style.product_info__title}>
              <h1>{productView.title}</h1>
            </div>
            <div className={style.product_info__detail}>
              <div className={style.product_info_detail__price}>
                <h2>{productView.price}</h2>
                <p>Puntos Superclub</p>
              </div>
              <div className={style.product_info_detail__stock}>
                <div className="">
                  <h2>{productView.stock}</h2>
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
              setProductView({ ...productView, title: e.target.value });
            }}
            className={style.productForm__input_name}
            type="text"
            name="title"
            placeholder="Titulo"
          />{" "}
          <label htmlFor="price">
            <p>Precio</p>
          </label>
          <input
            required
            onChange={(e) => {
              handleChange(e);
              setProductView({ ...productView, price: e.target.value });
            }}
            defaultValue={product.price}
            className={`${style.productForm__input_value} asNum`}
            ref={inputPrice}
            onKeyDown={(e)=>{
              keyPressFunction(e)
            }}
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
                  setProductView({ ...productView, stock: e.target.value });
                }}
                onKeyDown={(e)=>{
                  keyPressFunction(e);
                }}
                value={productView.stock === "" ? setProductView({...productView, stock: "0"}) : productView.stock}
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
              placeholder="Descripción del producto"
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
          {image.length ? (
            <>
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
                      <p>
                        {img.length > 30 ? `${img.substring(0, 30)}...` : img}
                      </p>
                      <button onClick={(e) => deleteImgActuales(e, i)}>
                        Quitar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <label htmlFor="new-images">
                <p>Este producto no contiene imagenes</p>
              </label>
            </>
          )}
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
