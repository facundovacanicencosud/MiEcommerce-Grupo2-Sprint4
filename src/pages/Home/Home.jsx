import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <ul>
        {/* {isLoading ? (
          <li className={style.loaderContainer}>
            <span>Loading</span>
            <div className={style.spinner}></div>
          </li>
        ) : (
          products.length &&
          products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <li className={style.product}>
                <div>
                  <img src={product.images[product.images.length - 1]} alt="" />
                  <div className={style.productDetails}>
                    <p className={style.productTitle}>{product.title}</p>
                    <p className={style.productDescription}>#{product.id}</p>
                  </div>
                </div>
                <img className={style.arrow} src={arrow} alt="" />
              </li>
            </Link>
          ))
        )} */}
      </ul>
    </div>
  );
};

export default Home;
