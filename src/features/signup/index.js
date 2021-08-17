import { auth } from "firebase/config";
import React, { useState } from "react";
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

export default function Signup() {
  const [nickname, setNickname] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState();

  const history = useHistory();

  const registerUser = (e) => {
    e.preventDefault();

    const user = {
      uid: "",
      nickname,
      birthday,
      gender,
      avatarUrl:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      createdAt: new Date(),
      isSignup: true,
      isOnline: true,
      isAvailable: false,
    };
    console.log(user);

    // dispatch(signup(user));
    history.push("/chatroom");
  };
  console.log("Auth: ", auth.currentUser);

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
