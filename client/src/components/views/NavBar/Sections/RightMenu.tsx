import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RightMenu = (props: any) => {
  const user = useSelector((state: any) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData?.data && !user.userData?.data?.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <Link to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">Signup</Link>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <Link to="/video/upload">Video</Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <a href="#/" onClick={logoutHandler}>
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );
  }
};

export default withRouter(RightMenu);
