import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import React from "react";
import { Button, Col, Container, Row } from "reactstrap";

export default function Sidebar() {
  return (
    <Container>
      <p>this is side bar</p>
      <Row>
        <Col>
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            alt=""
          />
        </Col>
        <Col>userName</Col>
        <Col></Col>
      </Row>
      <Row>
        <p>list user online</p>
      </Row>
    </Container>
  );
}
