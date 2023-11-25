import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./Login.css";    
import { makeRequest } from "../../fetch";
    
const Otp = () => {
  const [otp, setOtp] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate()
    const verifyOTP = async () => {
        try {
          await makeRequest('auth/gmail/verify', "POST", { email, otp });
          navigate("/google/signup")
        } catch (error) {
          console.error('Error verifying OTP:', error);
        }
      };

    return (
        <div>
        <label>OTP:</label>
          <input type="text" onChange={(e) => setOtp(e.target.value)} value={otp} />
          <button onClick={verifyOTP}>Verify OTP</button>
          </div>
    )
}

export default Otp