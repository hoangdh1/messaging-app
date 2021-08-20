import Signup from "features/signup";
import firebase, { auth } from "firebase/config";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./App.css";
import ChatRoom from "./features/ChatRoom/index";
import Login from "./features/login/index";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (!user) {
          console.log("User is not logged in");
          return;
        }

        try {
          const currentUser = auth.currentUser;
          const uid = user.uid;
          const email = user.email;

          console.log("currentUser in login: ", currentUser);

          console.log("Logged in user with email: ", email, "uid la: ", uid);
        } catch (error) {
          console.log("Failed to login ", error.message);
        }
      });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route component={Login} path="/login" />
        <Route component={Signup} path="/signup" />
        <Route component={ChatRoom} path="/chatroom" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
