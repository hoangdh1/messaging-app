import firebase, { auth, db } from "firebase/config";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import "./login.scss";

const uiConfig = {
  signInFlow: "popup",
  // signInSuccessUrl: "",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

// Set Auth state persistence
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export default function Login() {
  const history = useHistory();

  const checkLogin = () => {
    const currentUser = auth.currentUser;
    const uid = currentUser.uid;

    // console.log("uid after login", uid);

    // Update active user
    db.collection("users").doc(uid).update({ isOnline: true });

    sessionStorage.setItem("uidCurrentUser", JSON.stringify(uid));

    history.push("/chatroom");
  };

  const checkBeforeSignup = () => {
    const currentUser = auth.currentUser;
    const uid = currentUser.uid;

    // console.log("uid after login", uid);

    sessionStorage.setItem("uidCurrentUser", JSON.stringify(uid));

    history.push("/signup");
  };

  return (
    <div className="login-page">
      <h1>Messaging App</h1>
      <p>Please sign-in first:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      <p className="signup">
        Don't have an account?{" "}
        <Button outline color="secondary" size="sm" onClick={checkBeforeSignup}>
          Sign up now
        </Button>
      </p>
      <p className="login">
        Already have an account?{" "}
        <Button outline color="primary" size="sm" onClick={checkLogin}>
          Go to chat room
        </Button>
      </p>
    </div>
  );
}
