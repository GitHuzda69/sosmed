import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeRequest } from "../../axios.js";
import "./Login.css";
import { loginCall } from "../apiCalls.js";
import { Icon } from "@iconify/react";
import AuthContext from '../../context/authContext.js';

const Login = () => {
  const username = useRef();
  const password = useRef();
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState();
  const { isFetching, dispatch } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const sendOTP = async () => {
    try {
      await makeRequest.post('/auth/gmail/send', { email });
      setIsEmailSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await makeRequest.post('/auth/gmail/verify', { email, otp });
      console.log(response.data);
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

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
      <div>
      <h2>Login</h2>
      <form action="" >
      <div
        className="form-groups"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
       <strong style={{ paddingBottom: "10px" }}>
        <label>Email</label>
      </strong>
      <input type="email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        className="input-login"
        placeholder="Enter Email"/>
      <strong style={{ paddingBottom: "10px" }}>
        <label>Username</label>
      </strong>
      <input
        className="input-login"
        type="username"
        placeholder="Enter Username"
        ref={username}
      />
      {!isEmailSent ? (
        <button onClick={sendOTP} className="login" style={{ marginTop: "20px" }}>Send OTP</button>
      ) : (
        <>
          <label>OTP:</label>
          <input type="text" onChange={(e) => setOtp(e.target.value)} value={otp} />
          <button onClick={verifyOTP}>Verify OTP</button>
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
              <button
                type="submit"
                className="login"
                style={{ marginTop: "20px" }}
                disabled={isFetching}
              >
                {isFetching ? <></> : "Log In"}
              </button>
            </div>
        </>
      )}
      </div>
      </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
