import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeRequest } from "../../fetch.js";
import GSignup from "../../pages/register/Google.js";
import "./Login.css";

import loginimages from "../../assets/Background.png";

const Google = () => {
  const [email, setEmail] = useState();

  const sendOTP = async () => {
    try {
      await makeRequest("auth/gmail/send", "POST", { email });
    } catch (error) {
      console.error("Error sending OTP:", error);
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
              <Link to={`/google/otp?email=${email}`}>
                <button onClick={sendOTP} className="login-google">
                  Send OTP
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Google;
