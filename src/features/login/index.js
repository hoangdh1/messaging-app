import { Button } from "reactstrap";
import firebase, { auth } from "firebase/config";
import React, { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useHistory } from "react-router-dom";

const uiConfig = {
  signInFlow: "redirect",
  // signInSuccessUrl: "/chatroom",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

export default function Login() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  const [isSignup, setIsSignup] = useState(false); //

  const history = useHistory();

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
        var uid = user.uid;
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    );
  }
  if (isSignedIn) {
    if (!isSignup) {
      setIsSignup(true);
      return history.push("/signup");
    }
  }

  return (
    <div>
      <h1>My App</h1>
      <p>Welcome {auth.currentUser.displayName}! You are now signed-in!</p>
      <Button onClick={() => firebase.auth().signOut()}>Sign-out</Button>
    </div>
  );
}
