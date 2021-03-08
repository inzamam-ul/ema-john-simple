import React from "react";
import { Link } from "react-router-dom";

const ReviewProduct = (props) => {
  const { img, key, name, price } = props.product;
  return (
    <div>
      <article className="d-flex align-items-center justify-content-start single-pd">
        <img src={img} alt="" />
        <div className="div-details p-5">
          <Link to={"/product/" + key}>
            <h6>{name}</h6>
          </Link>

          <h4>${price}</h4>
          <h4>Quantity: {props.count}</h4>

          <button
            className="btn btn-warning"
            onClick={() => props.removeProduct(key)}
          >
            remove
          </button>
        </div>
      </article>
    </div>
  );
};

export default ReviewProduct;
