import React, { useState, useEffect, useRef } from "react";
import "./Login.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { makeRequest } from "../../fetch.js";
import { useAuth } from "../../context/authContext";

import loginimages from "../../assets/Background.png";

const Facebook = (socket) => {
  const username = useRef();
  const displayname = useRef();
  const password = useRef();
  const history = useNavigate();
  const [user, setUser] = useState(false);
  const [agreeStatus, setAgreeStatus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  useEffect(() => {
    const fetchUser = async () => {
      const url = `auth/facebook/users?code=${code}`;
      try {
        const res = await makeRequest(url);
        setUser(res);
      } catch (err) {
        // Handle error
        console.error("Error:", err.message);
      }
    };
    fetchUser();
  }, []);

  const email = user.email;

  const handleClick = async (e) => {
    e.preventDefault();

    if (!agreeStatus) {
      setErrors("Please agree to the Terms & Services Policy.");
      return;
    }

    const user = {
      username: username.current.value,
      email: email,
      displayname: displayname.current.value,
      password: password.current.value,
    };

    if (user.password.length < 8) {
      setErrors("Password must be at least 8 characters long.");
      return;
    }

    try {
      await makeRequest("auth/facebook/register", "POST", user);
      history("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseError = () => {
    setErrors(null);
  };

  return (
    <div className="signup-main">
      <div className="signup-container">
        <h1>Welcome, please insert your information to make an account.</h1>
        <img className="register-images" src={loginimages} alt="" />
        <div className="signup-form">
          <h3>Sign up</h3>
          <form action="" onSubmit={handleClick}>
            <div
              className="form-group"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <strong style={{ paddingBottom: "5px" }}>
                <label>Username</label>
              </strong>
              <input className="input-signup" placeholder="Enter Your Username" required name="username" ref={username} />
            </div>
            <div
              className="form-group"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <strong style={{ paddingBottom: "5px" }}>
                <label>Email</label>
              </strong>
              <input type="email" value={user.email} className="input-signup" readOnly />
            </div>
            <div
              className="form-group"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <strong style={{ paddingBottom: "5px" }}>
                <label>Display Name</label>
              </strong>
              <input className="input-signup" defaultValue={user.displayname} name="displayname" ref={displayname} />
            </div>
            <div
              className="form-group"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <strong style={{ paddingBottom: "5px" }}>
                <label type="password">Password</label>
              </strong>
              <input className="input-signup" type={showPassword ? "text" : "password"} placeholder="Enter Your Password" required name="password" ref={password} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="show-password-signup-button">
                {showPassword ? <Icon icon="clarity:eye-hide-line" color="black" width={23} height={23} /> : <Icon icon="clarity:eye-line" color="black" width={23} height={23} />}
              </button>
            </div>
            {errors && (
              <div className="error-register">
                <span>{errors}</span>
                <button onClick={handleCloseError}>Close</button>
              </div>
            )}
            <label className="checkbox-container-signup checkbox-label-signup">
              <input type="checkbox" className="checkbox-input-signup" checked={agreeStatus} onChange={() => setAgreeStatus(!agreeStatus)} />
              <h4>
                I Agree with
                <Link to="/other/terms-of-service">
                  <button type="button" className="terms-button">
                    Terms & Services
                  </button>
                </Link>
                Policy
              </h4>
            </label>
            <button className="sign-up" type="submit" onClick={handleClick}>
              Sign Up
            </button>
            <div
              className="log-in"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Facebook;
