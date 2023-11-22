import React, { useState } from 'react';
import { makeRequest } from "../../axios.js";

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
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

  return (
    <div>
      <h2>Login</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      
      {!isEmailSent ? (
        <button onClick={sendOTP}>Send OTP</button>
      ) : (
        <>
          <label>OTP:</label>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={verifyOTP}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default Login;
