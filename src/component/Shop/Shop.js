import React, { useEffect, useState } from "react";
import "./Shop.css";
import fakeData from "../../fakeData";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setproduct] = useState([]); //setProduct state
  useEffect(() => {
    setproduct(first10);
  }, [first10]);

  const stringCart = localStorage.getItem("cart"); //getting cart data from local storage
  let parsedCart;

  if (stringCart === null) {
    //if local storage is empty
    parsedCart = [];
  } else {
    parsedCart = JSON.parse(stringCart); //retriving data from local storage
  }

  const [cart, setCart] = useState(parsedCart); //setCart state

  const handleAddProduct = (product) => {
    let pdIndex = parsedCart.findIndex((pd) => pd.product.key === product.key); //finding if this product exists in the cart
    let count;
    if (pdIndex < 0) {
      //finding if this product exists in the cart
      count = 1;
      parsedCart = [...cart, { product, count }]; // if not exists then add to cart and set quantity 1
    } else {
      count = parsedCart[pdIndex].count + 1;
      parsedCart[pdIndex] = { product, count }; //if already exists then increase quantity and replace
    }
    setCart(parsedCart);
    localStorage.setItem("cart", JSON.stringify(parsedCart));
  };

  return (
    <section className="container-fluid">
      <div className="row mt-2">
        <div className="shop col-md-10">
          {products.map((product) => {
            return (
              <Product
                key={product.key}
                data={product}
                handleAddProduct={handleAddProduct}
                showBtn={true}
              />
            );
          })}
        </div>
        <div className="cart col-md-2">
          <Cart>
            <Link to="/review">
              <button className="btn btn-warning mt-2 px-5 fw-bold">
                <FontAwesomeIcon icon={faShoppingCart} /> Cheakout
              </button>
            </Link>
          </Cart>
        </div>
      </div>
    </section>
  );
};

export default Shop;
