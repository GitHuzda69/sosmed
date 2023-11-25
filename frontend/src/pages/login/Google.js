import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { makeRequest } from "../../fetch.js";
import GSignup from "../../pages/register/Google.js"
import "./Login.css";

const Google = () => {
  const [email, setEmail] = useState();
  const sendOTP = async () => {
    try {
      await makeRequest('auth/gmail/send', "POST", { email });
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

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
        <Link to="/google/otp" >
            <button onClick={sendOTP} className="login" >Send OTP</button></Link>
      </div>
      </form>
        </div>
      </div>
    </div>
  );
};

export default Google;
