import React from "react";
import {useLocation} from "react-router-dom";
import { Menu } from "antd";
import {Link} from "react-router-dom";

const LeftMenu = (props: any) => {
  const location = useLocation();

  return (
    <Menu mode={props.mode} selectedKeys={[location.pathname]}>
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      {props.user?.userData && props.user?.userData?.isAuth && (
        <Menu.Item key="/subscription">
          <Link to="/subscription">Subscription</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default LeftMenu;
