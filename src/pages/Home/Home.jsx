import { useEffect, useState } from "react";
import { getProducts } from "../../utils/apiConfig";
import style from "./home.module.css";
import Categorys from "../../components/Home/Categorys";

const Home = () => {
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <ul className={style.home_list}>
        {isLoading ? (
          <li className={style.loaderContainer}>
            <span>Loading</span>
            <div className={style.spinner}></div>
          </li>
        ) : products ? (
          <Categorys products={products} />
        ) : (
          <h3>No existen productos</h3>
        )}
      </ul>
    </div>
  );
};

export default Home;
