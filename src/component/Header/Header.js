import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../../images/logo.png";
import "./Header.css";
const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  return (
    <header>
      <img className="logo mt-3" src={logo} alt="" />
      <section className="bg-dark mt-2">
        <nav className="container text-white nav">
          <Link className="nav-link active" aria-current="page" to="/shop">
            Shop
          </Link>
          <Link className="nav-link" to="/review">
            Order Review
          </Link>
          <Link className="nav-link" to="/inventory">
            Mnage Inventory
          </Link>
          <button onClick={() => setLoggedInUser({})} className="nav-link">
            Sign Out
          </button>
        </nav>
      </section>
    </header>
  );
};

export default Header;
