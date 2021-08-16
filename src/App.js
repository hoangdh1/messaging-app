import Signup from "features/signup";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import ChatRoom from "./features/ChatRoom/index";
import Login from "./features/login/index";

function App() {
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
