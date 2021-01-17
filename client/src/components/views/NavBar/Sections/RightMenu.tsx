import React from "react";
import {Menu} from "antd";
import axios from "axios";
import {USER_SERVER} from "../../../../Config";
import {withRouter} from "react-router-dom";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import UploadIcon from "../../../../assets/images/upload.png";

const RightMenu = (props: any) => {
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  return (
    <>
      {(props.user?.userData && !props.user?.userData?.isAuth) ? (
        <Menu mode={props.mode} selectedKeys={[props.location.pathname]}>
          <Menu.Item key="/login">
            <Link to="/login">Signin</Link>
          </Menu.Item>
          <Menu.Item key="/register">
            <Link to="/register">Signup</Link>
          </Menu.Item>
        </Menu>
      ) : (
        <Menu mode={props.mode} selectedKeys={[props.location.pathname]}>
          <Menu.Item key="/video/upload">
            <Link to="/video/upload"><img src={UploadIcon} alt="Upload"/></Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <a href="#/" onClick={logoutHandler}>
              Logout
            </a>
          </Menu.Item>
        </Menu>
      )}
    </>
  );
};

export default withRouter(RightMenu);
