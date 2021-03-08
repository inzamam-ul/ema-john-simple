import React, { useState } from "react";
import Cart from "../Cart/Cart";
import ReviewProduct from "../ReviewProduct/ReviewProduct";
import happyImg from "../../images/giphy.gif";

const Review = () => {
  let stringCart = localStorage.getItem("cart");
  let cart;

  if (stringCart === null) {
    cart = [];
  } else {
    cart = JSON.parse(stringCart); // retriving data from local storage
  }

  const [newcart, setNewCart] = useState(cart);

  const removeProduct = (key) => {
    const newPdList = newcart.filter((pd) => pd.product.key !== key); //filtering targeted product
    localStorage.setItem("cart", JSON.stringify(newPdList)); //updading local storage
    setNewCart(newPdList); //updating current cart state
  };

  const [orderPlace, setOrderPlace] = useState(false);

  const placeOrder = () => {
    setNewCart([]);
    localStorage.clear("cart");
    setOrderPlace(true);
  };

  let orderPlaced;
  if (orderPlace) {
    orderPlaced = <img src={happyImg} alt="" />;
  }
  return (
    <section className="container-fluid">
      <div className="row mt-2">
        <div className="shop col-md-10">
          {newcart.map((revewpd) => {
            return (
              <ReviewProduct
                key={revewpd.product.key}
                product={revewpd.product}
                count={revewpd.count}
                removeProduct={removeProduct}
              />
            );
          })}
          {orderPlaced}
        </div>
        <div className="cart col-md-2">
          <Cart>
            <button
              onClick={placeOrder}
              className="btn btn-warning mt-2 px-5 fw-bold"
            >
              Place Order
            </button>
          </Cart>
        </div>
      </div>
    </section>
  );
};

export default Review;
