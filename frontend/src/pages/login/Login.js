import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { Icon } from "@iconify/react";
import { loginCall } from "../apiCalls.js";
import "./Login.css";

const Login = () => {
  const username = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
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
    loginCall(userData, dispatch);
  };

  const navigate = useNavigate();
  const handleGoogle = () => {
  };

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
        <h1>Selamat Datang, silahkan masukkan pilih metode Log in Anda</h1>
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
                <label>Username</label>
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
            <Link to="/login/google"> 
            <button
              type="submit"
              className="login-else"
              style={{ marginTop: "20px" }}
            >
              <span className="login-else-icon">
                <Icon icon="devicon:google" width={20} height={20} />
              </span>
              <h5>Continue with Google</h5>
            </button></Link>
            <button
              type="submit"
              className="login-else"
              style={{ marginTop: "20px" }}
            >
              <span className="login-else-icon">
                <Icon
                  icon="brandico:facebook-rect"
                  width={20}
                  height={20}
                  color="rgb(43, 88, 209)"
                />
              </span>
              <h5>Continue with Facebook</h5>
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
