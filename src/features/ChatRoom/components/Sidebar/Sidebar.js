import {
  getCurrentUser,
  getOnlineUsers,
  setUidFriend,
} from "features/ChatRoom/userSlice";
import { auth, db } from "firebase/config";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
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
        if (doc.data().isOnline && doc.id !== uidCurrentUser) {
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
                .update({ isOnline: false });

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
          {user.users.map((user) => {
            if (user.isOnline === true)
              return (
                <div
                  onClick={() => startChat(user)}
                  key={user.id}
                  className="avatar"
                  style={{ fontSize: "20px", marginBottom: "10px" }}
                >
                  <img
                    src={user.avatarUrl}
                    alt=""
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      marginRight: "10px",
                    }}
                  />
                  {user.nickname}
                </div>
              );
          })}
        </p>
      </Row>
    </div>
  );
}
