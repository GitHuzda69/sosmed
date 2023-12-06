import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { Icon } from "@iconify/react";
import "./Login.css";
import FacebookLogin from "react-facebook-login";

import loginimages from "../../assets/Background.png";
import { makeRequest } from "../../fetch";

const Login = () => {
  const username = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = {
      username: username.current.value,
      password: password.current.value,
    };
  
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("userData");
    }
  
    const loginCall = async (userCredential, dispatch) => {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await makeRequest("auth/login", "POST", userCredential);
        dispatch({ type: "LOGIN_SUCCESS", payload: res });
      } catch (err) {
        setError(err.message);
        dispatch({ type: "LOGIN_FAILURE", payload: err });
      }
    };
  
    try {
      await loginCall(userData, dispatch);
    } catch (error) {
      console.error(error)
    }
  };

  const navigate = useNavigate();
  const handleGoogle = () => {};

  const responseFacebook = (response) => {
    console.log(response);
  };
  console.log(process.env.FB_APP_ID);

  useEffect(() => {
    const rememberMeStatus = localStorage.getItem("rememberMe");
    if (rememberMeStatus === "true") {
      setRememberMe(true);

      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const { username: storedUsername, password: storedPassword } =
          JSON.parse(storedUserData);
        username.current.value = storedUsername;
        password.current.value = storedPassword;
      }
    }
  }, []);

  return (
    <div className="login-pages">
      <div className="login-containers">
        <h1>Welcome, good to see you again.</h1>
        <img className="login-images" src={loginimages} alt="" />
        <div className="login-forms">
          <h3>Log in</h3>
          <form action="" onSubmit={handleLogin}>
            <div
              className="form-groups"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <strong style={{ paddingBottom: "10px" }}>
                <label>Username or Email</label>
              </strong>
              <input
                className="input-login"
                type="username"
                placeholder="Enter Username"
                ref={username}
              />
            </div>
            <div
              className="form-groups"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <strong style={{ paddingBottom: "10px" }}>
                <label>Password</label>
              </strong>
              <input
                className="input-login"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                ref={password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="show-password-button"
              >
                {showPassword ? (
                  <Icon
                    icon="clarity:eye-hide-line"
                    color="black"
                    width={23}
                    height={23}
                  />
                ) : (
                  <Icon
                    icon="clarity:eye-line"
                    color="black"
                    width={23}
                    height={23}
                  />
                )}
              </button>
              <div className="form-groups">
                <label className="checkbox-container checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <h4>Remember Me</h4>
                </label>
              </div>
              <button type="button" className="forgot-password-button">
                Forgot Password
              </button>
              <span>{error && error}</span>
              <button
                type="submit"
                className="login"
                style={{ marginTop: "20px" }}
                disabled={isFetching}
              >
                {isFetching ? <></> : "Log In"}
              </button>
            </div>
            <div className="or-divider">
              <div className="divider-line"></div>
              <div className="divider-text">OR</div>
              <div className="divider-line"></div>
            </div>
            <Link to="/google" style={{ textDecoration: "none" }}>
              <button
                type="submit"
                className="login-else"
                style={{ marginTop: "20px" }}
              >
                <span className="login-else-icon">
                  <Icon icon="devicon:google" width={20} height={20} />
                </span>
                <h5>Continue with Google</h5>
              </button>
            </Link>
            <button
              style={{ marginTop: "20px" }}
            >
              <FacebookLogin 
              appId={process.env.FB_APP_ID}
              autoLoad={true}
              fields="name,email,picture"
              callback={responseFacebook}
              textButton="Continue with Facebook"
              className="login-else"
              size="small"
              />
              <span className="login-else-icon">
              </span>
              <h5></h5>
            </button>
            <div
              className="signup"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <p>Doesn't have an account?</p>
              <Link
                to="/signup"
                className="button-signup"
                style={{ width: "60px" }}
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
