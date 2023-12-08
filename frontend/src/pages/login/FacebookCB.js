import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { makeRequest } from "../../fetch.js";
import GSignup from "../register/Google.js";
import { useAuth } from "../../context/authContext.js";
import "./Login.css";

import loginimages from "../../assets/Background.png";

const Facebook = () => {
  const [errors, setErrors] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { setAuthEmail } = useAuth();
  const queryParams = new URLSearchParams(window.location.search);
  const codeParam = queryParams.get('code');
  console.log(codeParam);

  const callback = async () => {
    try {
      const res = await makeRequest(`auth/facebook/callback?code=${codeParam}`, "GET")
      console.log(res);
    } catch (err) {
      setErrors(err.message);
    }
  };

  return (
    <div className="login-pages">
      <div className="login-containers-google">
        <h1>Welcome, insert your information to make an account.</h1>
        <img className="login-images-google" src={loginimages} alt="" />
        <div>
          <h2 style={{ fontFamily: "Inter", fontSize: "30px" }}>
            Connect With Google
          </h2>
          <form action="">
            <div
              className="form-groups-google"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <strong style={{ paddingBottom: "10px" }}>
                <label>We need your email to send a verification OTP.</label>
                <p>Your Email</p>
              </strong>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-login"
                placeholder="Enter Email"
              />
              <span>{errors && errors}</span>
              <button
                onClick={callback}
                className="login-google"
              >
                Send OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Facebook;
