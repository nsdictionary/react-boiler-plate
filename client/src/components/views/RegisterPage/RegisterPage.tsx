import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";

const RegisterPage = (props: any) => {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onSubmitHandler = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("confirm password!");
    }

    const body = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.data?.ok) {
        props.history.push("/login");
      } else {
        alert("Signup Failed");
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
      <form
        onSubmit={onSubmitHandler}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
