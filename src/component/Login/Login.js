import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  intializeLoginFramework,
  logInUserWithEmailAndPassword,
} from "./LoginManager";

intializeLoginFramework();

const Login = () => {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    newUser: false,
    photo: "",
    error: "",
    successful: false,
  });

  const style = {
    margin: "5px",
    backgroundColor: "salmon",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    color: "white",
  };

  const handleSignUP = (e) => {
    e.preventDefault();
    // console.log(user.email, user.password);
    if (user.name && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
        }
      );
    }
  };

  //private route
  let history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathName: "/" } };

  //email & password login
  const handleLogIn = (e) => {
    e.preventDefault();
    if (!user.newUser && user.email && user.password) {
      logInUserWithEmailAndPassword(user.email, user.password).then((res) => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      });
    }
  };

  const handleChange = (e) => {
    let isFormValid = true;
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const hasNumber = /\d{1}/.test(e.target.value);
      isFormValid = hasNumber && isPasswordValid;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      setUser(res);
      setLoggedInUser(res);
    });
  };

  return (
    <div>
      <h1>My basic auth</h1>
      <button style={style} onClick={googleSignIn}>
        google sign in
      </button>
      <button style={style} onClick={fbSignIn}>
        FB sign in
      </button>
      <button style={style} onClick={signOut}>
        Sign out
      </button>
      <button
        style={style}
        onClick={() => {
          const newUserInfo = { ...user };
          newUserInfo.newUser = user.newUser ? false : true;
          setUser(newUserInfo);
        }}
      >
        {user.newUser ? "login" : "Sign up"}
      </button>
      {user.isSignedIn && <p>Welcome, {user.name}</p>}
      <br />
      {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}

      <form onSubmit={user.newUser ? handleSignUP : handleLogIn}>
        {user.newUser && (
          <input
            name="name"
            type="text"
            onBlur={handleChange}
            placeholder="Name"
          />
        )}
        <br />
        <input
          name="email"
          type="text"
          onBlur={handleChange}
          placeholder="Email"
          required
        />
        <br />
        <input
          name="password"
          type="password"
          onBlur={handleChange}
          placeholder="Password"
          required
        />
        <br />
        <input type="submit" value="submit" />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {user.newUser ? "created" : "logged in"} successfully
        </p>
      )}
    </div>
  );
};

export default Login;
