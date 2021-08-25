import Signup from "features/signup";
import firebase from "firebase/config";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import ChatRoom from "./features/ChatRoom/index";
import Login from "./features/login/index";

function App() {
  // const [uidCurrentUser, setUidCurrentUser] = useState();

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (!user) {
          // console.log("User is not logged in");
          return;
        }

        // try {
        //   setUidCurrentUser(user.id);
        //   const uid = user.uid;
        //   const email = user.email;

        //   console.log("currentUser in login: ", uidCurrentUser);
        //   console.log("Logged in user with email: ", email, "uid: ", uid);
        // } catch (error) {
        //   console.log("Failed to login ", error.message);
        // }
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
