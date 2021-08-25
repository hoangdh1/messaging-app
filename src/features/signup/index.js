import firebase, { db } from "firebase/config";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, CustomInput, Form, FormGroup, Input, Label } from "reactstrap";
import "./signup.scss";

var md5 = require("md5");

export default function Signup() {
  const [nickname, setNickname] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState();

  const history = useHistory();

  const uidCurrentUser = JSON.parse(sessionStorage.getItem("uidCurrentUser"));

  const HASH = md5(uidCurrentUser);
  const avatarUrl = `https://www.gravatar.com/avatar/${HASH}?d=retro`;

  // const currentUser = auth.currentUser;
  // console.log(
  //   "currentUser in signup: ",
  //   currentUser,
  //   "uid sidebar: ",
  //   uidCurrentUser
  // );

  // Add info of user to firestore
  const registerUser = (e) => {
    e.preventDefault();

    db.collection("users").doc(uidCurrentUser).set({
      id: uidCurrentUser,
      nickname: nickname,
      birthday: birthday,
      gender: gender,
      avatarUrl: avatarUrl,
      isSignup: true,
      isOnline: true,
      chattingWith: null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    history.push("/chatroom");
  };

  return (
    <div className="signup-page">
      <h2>Sign up</h2>
      <div className="form-content">
        <Form onSubmit={registerUser} form>
          <FormGroup>
            <Label for="nickname">Nickname</Label>
            <Input
              type="text"
              name="nickname"
              id="nickname"
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter a nickname"
            />
          </FormGroup>

          <FormGroup>
            <Label for="birthday">Birthday</Label>
            <Input
              type="date"
              name="date"
              id="birthday"
              onChange={(e) => setBirthday(e.target.value)}
              placeholder="date placeholder"
            />
          </FormGroup>

          <FormGroup>
            <Label for="gender">Gender</Label>
            <div>
              <CustomInput
                type="radio"
                id="male"
                name="gender"
                onChange={(e) => setGender("Male")}
                label="Male"
              />
              <CustomInput
                type="radio"
                id="female"
                name="gender"
                onChange={(e) => setGender("Female")}
                label="Female"
              />
            </div>
          </FormGroup>

          <Button>Sign up</Button>
        </Form>
      </div>
    </div>
  );
}
