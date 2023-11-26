import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { makeRequest } from "../../fetch";
import "./Login.css";

import loginimages from "../../assets/Background.png";

const Otp = () => {
  const [otp, setOtp] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState(null);
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [allInputsFilled, setAllInputsFilled] = useState(false);
  
  const sendOTP = async () => {
    try {
      makeRequest("auth/gmail/resend", "POST", { otp: otpValues });
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOTP = async () => {
    try {
      await makeRequest("auth/gmail/verify", "POST", { email, otp });
      navigate("/google/signup");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrors("Failed to verify OTP. Please try again.");
    }
  };

  const handleOtpChange = (e, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = e.target.value;

    setOtpValues(newOtpValues);

    const allFilled = newOtpValues.every((value) => value !== "");
    setAllInputsFilled(allFilled);

    const nextIndex = index + 1;
    if (e.target.value && nextIndex < 6) {
      const nextInput = document.getElementById(`otpInput${nextIndex}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  
  const history = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userEmail = searchParams.get("email");

    if (userEmail) {
      setEmail(userEmail);
    } else {
      history('/google');
    }
  }, [location.search, history]);

  return (
    <div className="login-pages">
      <div className="login-containers-google">
        <h1>Please verify the OTP code.</h1>
        <img className="login-images-google" src={loginimages} alt="" />
        <div>
          <h2 style={{ fontFamily: "Inter", fontSize: "30px" }}>
            Verification
          </h2>
          <form action="">
            <div
              className="form-groups-otp"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <strong style={{ paddingBottom: "15px" }}>
                <label style={{ display: "inline-block" }}>
                  We have sent you a 6-digit verification code to your email{" "}
                  <p style={{ display: "inline" }}>{email}</p>
                </label>
              </strong>
              <div className="otp-input-container">
                {[...Array(6)].map((_, index) => (
                  <input
                    className="otp-input"
                    key={index}
                    type="text"
                    maxLength={1}
                    onChange={(e) => handleOtpChange(e, index)}
                    value={otpValues[index] || ""}
                  />
                ))}
              </div>
                <span>{errors && errors}</span>
                <button
                  onClick={verifyOTP}
                  className="login-google"
                  disabled={!allInputsFilled}
                >
                  Verify OTP
                </button>
              <div className="otp-resend">
                <h4>Didn't receive the code?</h4>
                <button onClick={sendOTP}>
                  <h5>Resend</h5>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
