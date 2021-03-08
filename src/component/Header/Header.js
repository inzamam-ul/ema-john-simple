import React from "react";
import logo from "../../images/logo.png";
import "./Header.css";
const Header = () => {
  return (
    <header>
      <img className="logo mt-3" src={logo} alt="" />
      <section className="bg-dark mt-2">
        <nav className="container text-white nav">
          <a className="nav-link active" aria-current="page" href="/shop">
            Shop
          </a>
          <a className="nav-link" href="/review">
            Order Review
          </a>
          <a className="nav-link" href="/inventory">
            Mnage Inventory
          </a>
        </nav>
      </section>
    </header>
  );
};

export default Header;
