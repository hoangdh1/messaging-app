import { signup } from "features/ChatRoom/userSlice";
import firebase, { auth, db } from "firebase/config";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

var md5 = require("md5");

export default function Signup() {
  const [nickname, setNickname] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState();

  const users = useSelector((state) => state.users);

  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = auth.currentUser;
  const uid = currentUser.uid;
  const email = currentUser.email;

  const HASH = md5(email);
  const avatarUrl = `https://www.gravatar.com/avatar/${HASH}?d=identicon`;

  console.log("currentUser in signup: ", currentUser, "uid sidebar: ", uid);

  const registerUser = (e) => {
    e.preventDefault();

    const user = {
      email,
      nickname,
      birthday,
      gender,
    };

    db.collection("users").doc(uid).set({
      id: uid,
      nickname: nickname,
      birthday: birthday,
      gender: gender,
      avatarUrl: avatarUrl,
      isSignup: true,
      isOnline: true,
      isAvailable: true,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    history.push("/chatroom");
  };

  return (
    <div>
      <Container>
        <h2>Sign up</h2>
        <Form onSubmit={registerUser}>
          <Row form>
            <Col md={6}>
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
            </Col>
            <Col md={6}>
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
            </Col>
            <Col md={6}>
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
            </Col>
          </Row>
          <Button className="mt-4">Sign up</Button>
        </Form>
      </Container>
      <Button
        onClick={() =>
          auth
            .signOut()
            .then(console.log("Sign out successfully"), history.push("/"))
            .catch(() => console.log("Sign out failed"))
        }
      >
        Sign-out
      </Button>
    </div>
  );
}
