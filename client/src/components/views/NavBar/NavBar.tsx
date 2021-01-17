import React, { useState } from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button, Icon } from "antd";
import "./Sections/Navbar.css";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";


const NavBar = () => {
  const user = useSelector((state: any) => state.user);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  if(user.userData) {
    return (
      <nav
        className="menu"
        style={{position: "fixed", zIndex: 5, width: "100%"}}
      >
        <div className="menu__logo">
          <Link to="/">Logo</Link>
        </div>
        <div className="menu__container">
          <div className="menu_left">
            <LeftMenu user={user} mode="horizontal"/>
          </div>
          <div className="menu_rigth">
            <RightMenu user={user} mode="horizontal"/>
          </div>
          <Button
            className="menu__mobile-button"
            type="primary"
            onClick={showDrawer}
          >
            <Icon type="align-right"/>
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="right"
            className="menu_drawer"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <LeftMenu mode="inline"/>
            <RightMenu mode="inline"/>
          </Drawer>
        </div>
      </nav>
    );
  } else {
      return <></>;
  }
};

export default NavBar;
