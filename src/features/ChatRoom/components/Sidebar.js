import firebase from "firebase";
import { Button, Col, Container, Row } from "reactstrap";

export default function Sidebar() {
  return (
    <Container>
      <p>this is side bar</p>
      <Row>
        <Col md={3}>
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            alt=""
          />
        </Col>
        <Col md={3}>userName</Col>
        <Col>
          <Button
            onClick={() => {
              console.log("sign out btn");
              firebase.auth().signOut();
            }}
          >
            Log out
          </Button>
        </Col>
      </Row>
      <Row>
        <p>list user online</p>
      </Row>
    </Container>
  );
}
