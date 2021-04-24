import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const intializeLoginFramework = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
};

//google sign in
export const handleGoogleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        successful: true,
      };
      return signedInUser;
      //   console.log(displayName, photoURL, email);
    });
};

//fb sign in
export const handleFbSignIn = () => {
  const FbProvider = new firebase.auth.FacebookAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(FbProvider)
    .then((res) => {
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        successful: true,
      };
      return signedInUser;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
    });
};

//sign out
export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      // Sign-out successful.
      const signedInUser = {
        isSignedIn: false,
        name: "",
        email: "",
        photo: "",
        error: "",
        successful: false,
      };
      return signedInUser;
    })
    .catch((error) => {
      // An error happened.
    });
};

//update user name
const updateUserName = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      // Update successful.
      console.log("User name updated successfully");
    })
    .catch(() => {
      // An error happened.
      console.log("User name dosen't updated successfully");
    });
};

// login user
export const logInUserWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userInfo) => {
      // Signed in
      const newUserInfo = userInfo.user;
      newUserInfo.success = true;
      newUserInfo.error = "";
      return newUserInfo;

      // ...
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

//Create user with email and password
export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in
      const newUserInfo = res.user;
      console.log(res);
      newUserInfo.success = true;
      newUserInfo.error = "";
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      let newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      return newUserInfo;
      // ..
    });
};
