import { Button } from "reactstrap";
import firebase, { auth } from "firebase/config";
import React, { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// const fbProvider = new firebase.auth.FacebookAuthProvider();
// const ggProvider = new firebase.auth.GoogleAuthProvider();

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "redirect",
  signInSuccessUrl: "/chatroom",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

export default function Login() {
  // const history = useHistory();

  // const handleFbLogin = () => {
  //   auth.signInWithPopup(fbProvider);
  // };

  // const handleGgLogin = () => {
  //   auth.signInWithPopup(ggProvider);
  // };

  // auth.onAuthStateChanged((user) => {
  //   console.log({ user });
  //   if (user) {
  //     history.push("/");
  //   }
  // });

  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        <p>Chua co tai khoan</p>
      </div>
    );
  }
  return (
    <div>
      <h1>My App</h1>
      <p>Welcome {auth.currentUser.displayName}! You are now signed-in!</p>
      <Button onClick={() => firebase.auth().signOut()}>Sign-out</Button>
    </div>
  );

  // return (
  //   <div>
  //     <p>Đăng nhập</p>
  //     <Button onClick={handleGgLogin}>Đăng nhập bằng Google</Button>
  //     <Button onClick={handleFbLogin}>Đăng nhập bằng Facebook</Button>
  //   </div>
  // );
}
