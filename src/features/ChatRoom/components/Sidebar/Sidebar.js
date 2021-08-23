import {
  getCurrentUser,
  getOnlineUsers,
  setUidFriend,
} from "features/ChatRoom/userSlice";
import { auth, db } from "firebase/config";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Badge, Button, Col, Row, Tag } from "reactstrap";
import "./Sidebar.scss";

export default function Sidebar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const history = useHistory();

  const uidCurrentUser = auth.currentUser.uid;
  console.log("currentUser in sidebar and uid: ", uidCurrentUser);

  // Get current user
  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
      const currentUser = [];
      querySnapshot.forEach(function (doc) {
        if (doc.data().isOnline && doc.id === uidCurrentUser) {
          currentUser.push(doc.data());
        }
      });

      dispatch(getCurrentUser(currentUser));
    });

    return unsubscribe;
  }, []);

  // Get online user list
  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach(function (doc) {
        if (doc.data().isOnline) {
          users.push(doc.data());
        }
      });

      dispatch(getOnlineUsers(users));
    });

    return unsubscribe;
  }, []);

  console.log("users: ", user.users);
  console.log("current users: ", user.currentUser);

  // Start chat
  const startChat = (user) => {
    db.collection("users")
      .doc(uidCurrentUser)
      .update({ chattingWith: user.id });

    dispatch(setUidFriend(user.id));
  };

  console.log("uidFriend: ", user.uidFriend);

  return (
    <div className="sidebar">
      {/* User info */}
      <Row className="user-infor">
        {user.currentUser.map((user) => {
          return (
            <Col className="avatar">
              <img
                src={user.avatarUrl}
                alt=""
                style={{ marginRight: "10px" }}
              />
              {user.nickname}
            </Col>
          );
        })}

        <Col className="btn-signout">
          <Button
            onClick={() => {
              db.collection("users")
                .doc(uidCurrentUser)
                .update({ isOnline: false, chattingWith: null })
                .then(console.log("update sign out successfully"))
                .catch(() => console.log("update signout failed"));

              dispatch(setUidFriend(null));

              auth
                .signOut()

                .then(console.log("Sign out successfully"), history.push("/"))
                .catch(() => console.log("Sign out failed"));
            }}
          >
            Sign-out
          </Button>
        </Col>
      </Row>

      {/* Online user list */}
      <Row className="list-users">
        <p>
          list user online
          {user.users.map((user_1) => {
            // Is user_1 starting to chat with user_2 ?
            const user_2 = user.users.find(
              ({ id }) => id === user_1.chattingWith
            );

            const isAvailable = user_2
              ? user_2.chattingWith === user_1.id
                ? false
                : true
              : true;

            console.log("isAvailable: ", isAvailable);

            console.log("user_1.chattingWith: ", user_1.chattingWith);

            if (user_1.isOnline === true && user_1.id !== uidCurrentUser)
              return (
                <div
                  onClick={() => startChat(user_1)}
                  key={user_1.id}
                  className="avatar"
                  style={{ fontSize: "20px", marginBottom: "10px" }}
                >
                  <img
                    src={user_1.avatarUrl}
                    alt=""
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      marginRight: "10px",
                    }}
                  />
                  {user_1.nickname}

                  {/* user available */}
                  {isAvailable ? "available" : null}
                  <Badge color="success">Success</Badge>
                </div>
              );
          })}
        </p>
      </Row>
    </div>
  );
}
