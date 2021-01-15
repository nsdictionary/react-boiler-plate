import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

const LoginPage = (props: any) => {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    const body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body));

    //   .then((res) => {
    //   if (res.payload.data) {
    //     props.history.push("/");
    //   } else {
    //     alert("Error");
    //   }
    // });
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
      <form
        onSubmit={onSubmitHandler}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { loginResult: state };
};

export default LoginPage;
// export default connect(mapStateToProps)(LoginPage);
