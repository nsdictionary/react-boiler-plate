import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

// option: null => allow all
// option: true => allow only logged in user
// option: false => allow only logged out user
const Auth = (
  SpecificComponent: any,
  option: boolean | null,
  adminRoute: any = null
) => {
  const AuthenticationCheck = (props: any) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((res) => {
        if (res.payload?.data?.ok) {
          // logged in
          if (adminRoute && !res.payload.data.isAdmin) {
            props.history.push("/");
          } else if (!option) {
            props.history.push("/");
          }
        } else {
          // not logged in
          if (option) {
            props.history.push("/login");
          }
        }
      });
    }, [dispatch, props.history]);

    return <SpecificComponent />;
  };

  return AuthenticationCheck;
};

export default Auth;
