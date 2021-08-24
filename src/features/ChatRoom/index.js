import React from "react";
import { Col, Row } from "reactstrap";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import Sidebar from "./components/Sidebar/Sidebar";

export default function ChatRoom() {
  return (
    <Row>
      <Col xs="3">
        <Sidebar />
      </Col>
      <Col xs="9">
        <ChatWindow />
      </Col>
    </Row>
  );
}
