import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import firebase, { auth } from "../../firebase/config";

const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const history = useHistory();

  const handleFbLogin = () => {
    auth.signInWithPopup(fbProvider);
  };

  const handleGgLogin = () => {
    auth.signInWithPopup(ggProvider);
  };

  auth.onAuthStateChanged((user) => {
    console.log({ user });
    if (user) {
      history.push("/");
    }
  });
  return (
    <div>
      <p>Đăng nhập</p>
      <Button onClick={handleGgLogin}>Đăng nhập bằng Google</Button>
      <Button onClick={handleFbLogin}>Đăng nhập bằng Facebook</Button>
    </div>
  );
}
