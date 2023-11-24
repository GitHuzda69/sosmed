import { useState } from "react";
import "./Login.css";    
import { makeRequest } from "../../fetch";
    
const Otp = () => {
  const [otp, setOtp] = useState();
  const [email, setEmail] = useState();

    const verifyOTP = async () => {
        try {
          const response = await makeRequest('auth/gmail/verify', "POST", { email, otp });
          console.log(response.data);
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