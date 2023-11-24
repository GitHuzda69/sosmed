import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeRequest } from "../../fetch.js";
import "./Login.css";
import { loginCall } from "../apiCalls.js";
import { Icon } from "@iconify/react";
import AuthContext from '../../context/authContext.js';

const Google = () => {
  const username = useRef();
  const password = useRef();
  const [email, setEmail] = useState();
  const { isFetching, dispatch } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const sendOTP = async () => {
    try {
      await makeRequest('auth/gmail/send', "POST", { email });
      setIsEmailSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
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
            </div>
            <button onClick={sendOTP} className="login" >Send OTP</button>
      </div>
      </form>
        </div>
      </div>
    </div>
  );
};

export default Google;
