import React from "react";
import {
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
} from "reactstrap";
import "./ChatWindow.scss";

var md5 = require("md5");

export default function ChatWindow() {
  const HASH = md5("hoang.do1403@gmail.com");

  return (
    <div className="chatwindow">
      <div className="friend-infor">
        <div className="avatar">
          <img
            src={`https://www.gravatar.com/avatar/${HASH}?d=identicon`}
            alt=""
          />
          Steve
        </div>
      </div>

      <div className="chat-area">
        <div className="conversation">
          <div className="friend">
            <div className="avatar">
              <img
                src={`https://www.gravatar.com/avatar/${HASH}?d=identicon`}
                alt=""
              />
              Steve
            </div>
            <div className="message">Hello</div>
          </div>
          <div className="me">
            <div className="avatar">
              <img
                src={`https://www.gravatar.com/avatar/1${HASH}?d=identicon`}
                alt=""
              />
              Steve
            </div>
            <div className="message">Hello</div>
          </div>
        </div>
        <div className="text-input">
          <InputGroup name="">
            <Input placeholder="..." />
            <InputGroupAddon addonType="append">
              <Button color="secondary">Send</Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </div>
  );
}
