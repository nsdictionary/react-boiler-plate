import React from "react";
import {useLocation} from "react-router-dom";
import { Menu } from "antd";

const LeftMenu = (props: any) => {
  const location = useLocation();

  return (
    <Menu mode={props.mode} selectedKeys={[location.pathname]}>
      <Menu.Item key="/">
        <a href="/">Home</a>
      </Menu.Item>
      {props.user?.userData && props.user?.userData?.isAuth && (
        <Menu.Item key="/subscription">
          <a href="/subscription">Subscription</a>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default LeftMenu;
