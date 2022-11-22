import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logInUser, validateRefreshToken } from "../store/authSlice";
import { useCookies } from "react-cookie";

export default function Auth(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userdata = useSelector((state) => state.Auth);

  useEffect(() => {
    if (userdata.isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  });

  const DispatchLogIn = async () => {
    dispatch(logInUser({ username: username, password: password }));
  };

  const LogIn = async () => {
    await DispatchLogIn();
    if (userdata.isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="AuthContainer">
      <div className="AuthHeaderDiv">
        <h1 className="AuthHeader">Sign in to your Dashboard!</h1>
      </div>

      <div className="AuthFormDiv">
        <div className="AuthFormField">
          <input
            type={"text"}
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="AuthFormInput"
          />
          <label className="AuthFormLabel">Username</label>
        </div>
        <div className="AuthFormField">
          <input
            type={"password"}
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="AuthFormInput"
          />
          <label className="AuthFormLabel">Password</label>
        </div>
        <button type="button" onClick={LogIn} className="LogInButton">
          Log In
        </button>
      </div>
    </div>
  );
}
