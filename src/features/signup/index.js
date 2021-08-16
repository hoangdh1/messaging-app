import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  CustomInput,
} from "reactstrap";

export default function Signup() {
  return (
    <div>
      <Container>
        <h2>Sign up</h2>
        <Form>
          <Row form>
            <Col md={6} className=" mt-4">
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="=password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="=password"
                  placeholder="Create a password"
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
                    label="Male"
                  />
                  <CustomInput
                    type="radio"
                    id="female"
                    name="gender"
                    label="Female"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="nickname">Nickname</Label>
                <Input
                  type="text"
                  name="nickname"
                  id="nickname"
                  placeholder="Enter a nickname"
                />
              </FormGroup>
            </Col>
          </Row>
          <Button className="mt-4">Sign up</Button>
          avatar
        </Form>
        Have an account? Log in.
      </Container>
    </div>
  );
}
