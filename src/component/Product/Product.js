import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { name, img, price, seller, stock, key } = props.data;
  const handleAddProduct = props.handleAddProduct;
  // console.log(props.data);
  return (
    <article className="d-flex align-items-center justify-content-start single-pd">
      <img src={img} alt="" />
      <div className="div-details p-5">
        <Link to={"/product/" + key}>
          <h6>{name}</h6>
        </Link>
        <p>
          <small>by:{seller}</small>
        </p>
        <h4>${price}</h4>
        <p>availabel in stock:{stock}</p>
        {props.showBtn && (
          <button
            className="btn btn-warning fw-bold"
            onClick={() => handleAddProduct(props.data)}
          >
            <FontAwesomeIcon icon={faShoppingCart} /> add to cart
          </button>
        )}
      </div>
    </article>
  );
};

export default Product;
