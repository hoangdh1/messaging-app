import { getOnlineUsers } from "features/ChatRoom/userSlice";
import { auth, db } from "firebase/config";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import "./Sidebar.scss";

var md5 = require("md5");

export default function Sidebar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const history = useHistory();

  const currentUser = auth.currentUser;
  const uid = currentUser.uid;
  console.log("currentUser in sidebar and uid: ", currentUser, uid);

  const HASH = md5("hoang.do1403.9@gmail.com");

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach(function (doc) {
        if (doc.data().isOnline == true) {
          users.push(doc.data());
        }
      });

      dispatch(getOnlineUsers(users));
    });

    return unsubscribe;
  }, []);

  return (
    <div className="sidebar">
      <Row className="user-infor">
        <Col className="avatar">
          <img
            src={`https://www.gravatar.com/avatar/${HASH}?d=identicon`}
            alt=""
          />
          Tony
        </Col>

        <Col className="btn-signout">
          <Button
            onClick={() => {
              db.collection("users").doc(uid).update({ isOnline: false });

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

      <Row className="list-users">
        <p>
          list user online
          {user.users.map((user) => {
            if (user.isOnline == true)
              return (
                <div
                  className="avatar"
                  style={{ fontSize: "20px", marginBottom: "10px" }}
                >
                  <img
                    src={user.avatarUrl}
                    alt=""
                    style={{ borderRadius: "50%", width: "40px" }}
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
