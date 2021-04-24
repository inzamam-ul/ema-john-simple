import React, { createContext, useState } from "react";
import "./App.css";
import Header from "./component/Header/Header";
import Shop from "./component/Shop/Shop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Review from "./component/Review/Review";
import Error from "./component/Error/Error";
import Inventory from "./component/Inventory/Inventory";
import ProductDetails from "./component/ProductDetails/ProductDetails";
import Shipment from "./component/Shipment/Shipment";
import Login from "./component/Login/Login";
import PrivetRoute from "./component/PrivateRoute/PrivetRoute";
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  document.title = "ema-john-simple";
  return (
    <div className="App">
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Router>
          <h1>{loggedInUser.email}</h1>
          <Header />

          <Switch>
            <Route exact path="/">
              <Shop />
            </Route>
            <Route path="/shop">
              <Shop />
            </Route>
            <Route path="/review">
              <Review />
            </Route>
            <PrivetRoute path="/inventory">
              <Inventory />
            </PrivetRoute>
            <PrivetRoute path="/shipment">
              <Shipment />
            </PrivetRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/product/:key">
              <ProductDetails />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
