import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../fetch.js";
import GSignup from "../../pages/register/Google.js";
import { useAuth } from "../../context/authContext.js";
import "./Login.css";

import loginimages from "../../assets/Background.png";

const Google = () => {
  const [errors, setErrors] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { setAuthEmail } = useAuth();

  const sendOTP = async () => {
    try {
      if (!email) {
        setErrors("Please enter your email before sending OTP.");
        return;
      }

      if (!email.includes("@")) {
        setErrors("Please enter a valid email address.");
        return;
      }

      makeRequest("auth/gmail/send", "POST", { email });
      setAuthEmail(email);
      navigate(`/google/otp`);
    } catch (error) {
      setErrors(error.message);
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
                onClick={sendOTP}
                className="login-google"
                disabled={!email || !email.includes("@")}
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

export default Google;
