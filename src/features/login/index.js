import { login } from "features/ChatRoom/userSlice";
import firebase, { auth, db } from "firebase/config";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const uiConfig = {
  signInFlow: "popup",
  // signInSuccessUrl: "/stage",
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
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const checkLogin = () => {
    const currentUser = auth.currentUser;
    const uid = currentUser.uid;
    const email = currentUser.email;

    console.log("uid after login", uid);
    db.collection("users").doc(uid).update({ isOnline: true });
    history.push("/chatroom");
  };

  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in first:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />

      <Button
        onClick={() => {
          history.push("/signup");
        }}
      >
        Chua dang ki
      </Button>
      <Button onClick={checkLogin}>Da dang ki</Button>
    </div>
  );
}
