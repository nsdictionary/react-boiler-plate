import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const LandingPage = (props: any) => {
  useEffect(() => {
    axios.get("/api/hello").then((res) => console.log(res.data));
  }, []);

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((res) => {
      if (res.data?.ok) {
        props.history.push("/login");
      } else {
        alert("Logout failed");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>
      <button onClick={onClickHandler}>Logout</button>
    </div>
  );
};

export default withRouter(LandingPage);
