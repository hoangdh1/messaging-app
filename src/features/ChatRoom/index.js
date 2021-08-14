import React from "react";
import { Col, Container, Row } from "reactstrap";
import ChatWindow from "./components/ChatWindow";
import Sidebar from "./components/Sidebar";

export default function ChatRoom() {
  return (
    <Container>
      <Row>
        <Col xs="4">
          <Sidebar />
        </Col>
        <Col xs="8">
          <ChatWindow />
        </Col>
      </Row>
    </Container>
  );
}
