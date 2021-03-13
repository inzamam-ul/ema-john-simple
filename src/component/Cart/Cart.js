import React from "react";
import "./Cart.css";

const Cart = (props) => {
  const stringCart = localStorage.getItem("cart"); //getting cart data from localStorage
  let cart;

  if (stringCart === null) {
    //if cart is empty
    cart = [];
  } else {
    cart = JSON.parse(stringCart);
  }

  const total = cart.reduce(
    (total, prd) => total + prd.product.price * prd.count, //calculating total price
    0
  );

  let shiping = 0;
  if (total === 0) {
    shiping = 0;
  } else if (total > 100) {
    shiping = 5;
  } else if (total < 100) {
    shiping = 10;
  }
  const formatNumber = (num) => {
    const number = num.toFixed(2);
    return Number(number);
  };
  const grandTotal = total + shiping;
  const vat = grandTotal / 10;
  return (
    <div className="cart-inner sticky-top">
      <h4>Order Summary</h4>
      <h6>Items added: {cart.reduce((total, prd) => total + prd.count, 0)}</h6>
      <div className="d-flex-y cart-content">
        <div className="calulation">
          <p>Product price: ${formatNumber(total)}</p>
          <p>Shiping: ${formatNumber(shiping)}</p>
          <p>VAT+Tax: ${formatNumber(vat)}</p>
          <h5>Total: ${formatNumber(grandTotal + vat)}</h5>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Cart;
