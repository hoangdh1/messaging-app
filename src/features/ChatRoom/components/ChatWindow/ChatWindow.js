import { getRealTimeMessages } from "features/ChatRoom/userSlice";
import firebase, { db } from "firebase/config";
import React, { useEffect, useState } from "react";
import Emojify from "react-emojione";
import Linkify from "react-linkify";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import "./ChatWindow.scss";

export default function ChatWindow() {
  const [messageText, setMessageText] = useState();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const uidCurrentUser = JSON.parse(sessionStorage.getItem("uidCurrentUser"));
  // console.log("currentUser in chatroom and uid: ", uidCurrentUser);

  const uidFriend = user.uidFriend;

  const roomId =
    uidCurrentUser < uidFriend
      ? uidCurrentUser + "-" + uidFriend
      : uidFriend + "-" + uidCurrentUser;
  // console.log("roomid: ", roomId);

  // Get realtime messages from firestore
  useEffect(() => {
    db.collection("messages")
      .doc(roomId)
      .collection("message")
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const messages = [];

        querySnapshot.forEach((doc) => {
          messages.push(doc.data());
        });

        dispatch(getRealTimeMessages(messages));
      });
  }, [roomId]);

  // Add message data to firestore
  const sendMessage = () => {
    const messageData = {
      uidSender: uidCurrentUser,
      messageText,
    };

    db.collection("messages")
      .doc(roomId)
      .collection("message")
      .add({
        ...messageData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((data) => {
        console.log("messageData: ", data);
      })
      .catch((error) => {
        console.log(error);
      });

    setMessageText("");
  };

  return (
    <div className="chatwindow">
      {/* Friend info */}
      {user.uidFriend
        ? user.users.map((user) => {
            if (user.id === uidFriend)
              return (
                <div className="friend-infor">
                  <div
                    key={user.id}
                    className="avatar"
                    style={{ fontSize: "20px" }}
                  >
                    <img
                      src={user.avatarUrl}
                      alt=""
                      style={{
                        borderRadius: "50%",
                        width: "44px",
                        marginRight: "10px",
                      }}
                    />
                    {user.nickname}
                  </div>
                </div>
              );
          })
        : null}

      {/* Chat area */}
      <div className="chat-area">
        {/* Chat content */}
        <div className="conversation">
          {user.uidFriend
            ? user.messages.map((message) => (
                <div
                  style={{
                    textAlign:
                      message.uidSender === uidCurrentUser ? "right" : "left",
                  }}
                >
                  <p className="message">
                    <Linkify>
                      <Emojify>{message.messageText}</Emojify>
                    </Linkify>
                  </p>
                </div>
              ))
            : null}
        </div>

        {/* Send message */}
        <div className="text-input">
          {user.uidFriend ? (
            <InputGroup name="">
              <Input
                value={messageText}
                placeholder="Type something..."
                onChange={(e) => setMessageText(e.target.value)}
              />
              <InputGroupAddon addonType="append">
                <Button onClick={sendMessage} disabled={!messageText}>
                  Send
                </Button>
              </InputGroupAddon>
            </InputGroup>
          ) : null}
        </div>
      </div>
    </div>
  );
}
