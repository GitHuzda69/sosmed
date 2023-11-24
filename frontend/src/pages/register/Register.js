import React, { useState, useEffect, useRef } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from "@iconify/react";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const displayname = useRef();
  const password = useRef();
  const history = useNavigate();
  const [agreeStatus, setAgreeStatus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [dataPopupVisible, setDataPopupVisible] = useState(false);
  const [showDuplicatePopup, setShowDuplicatePopup] = useState(false);

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    displayname: "",
    password: "",
  });
  const [err, setErrors] = useState(null);

  useEffect(() => {
    const agreeStatusFromLocalStorage = localStorage.getItem("agreeStatus");
    console.log(
      "Agree status from local storage:",
      agreeStatusFromLocalStorage
    );

    if (agreeStatusFromLocalStorage === "true") {
      setAgreeStatus(true);
    }
  }, []);

  const handleChange = (e) => {
    console.log("Inputs:", inputs);
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Inputs on handleClick:", inputs);

    if (!agreeStatus) {
      console.log("Agree status is false");
      setPopupVisible(true);
      return;
    }

    if (
      !inputs.username ||
      !inputs.email ||
      !inputs.displayname ||
      !inputs.password
    ) {
      console.log("Some input is missing");
      setDataPopupVisible(true);
      return;
    }

    const user = {
      username: username.current.value,
      email: email.current.value,
      displayname: displayname.current.value,
      password: password.current.value,
    };

    try {
      // Check for duplicate entries before making the registration request
      const response = await axios.get(
        `http://localhost:8800/api/auth/checkDuplicate/${user.username}`
      );
      console.log("Duplicate Check Response:", response);

      console.log("Duplicate Check Response Data:", response.data);
      if (response.data.duplicate) {
        setShowDuplicatePopup(true);
        return;
      }

      // If no duplicate, proceed with registration
      await axios.post("http://localhost:8800/api/auth/register", user);
      history("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDuplicatePopupClose = () => {
    setShowDuplicatePopup(false);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleDataPopupClose = () => {
    setDataPopupVisible(false);
  };

  return (
    <div className="signup-main">
      <div className="signup-container">
        <h1>Selamat Datang, silahkan masukkan data diri untuk membuat akun</h1>
        <div className="signup-form">
          <h3>Sign up</h3>
          <form action="">
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
              <input
                className="input-signup"
                placeholder="Enter Your Username"
                required
                name="username"
                ref={username}
                onChange={handleChange}
              />
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
                <label type="email">Email</label>
              </strong>
              <input
                className="input-signup"
                placeholder="Enter Your Active Email"
                required
                name="email"
                ref={email}
                onChange={handleChange}
              />
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
              <input
                className="input-signup"
                placeholder="Enter Your Display Name "
                name="displayname"
                ref={displayname}
                onChange={handleChange}
              />
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
              <input
                className="input-signup"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                required
                name="password"
                ref={password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="show-password-signup-button"
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
            </div>

            {err && <span>{err.response.statusText}</span>}
            <label className="checkbox-container-signup checkbox-label-signup">
              <input
                type="checkbox"
                className="checkbox-input-signup"
                checked={agreeStatus}
                onChange={() => setAgreeStatus(!agreeStatus)}
              />
              <h4>
                I Agree with
                <button type="button" className="terms-button">
                  Terms & Services
                </button>
                Policy
              </h4>
            </label>
            <button className="sign-up" onClick={handleClick}>
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
            >
              <p>Already have account?</p>
              <Link to="/login" className="button-log-in">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
      {popupVisible && (
        <div className="popup-logout-container">
          <div className="popup-register">
            <p>Please agree to the Terms & Services Policy.</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
      {dataPopupVisible && (
        <div className="popup-logout-container">
          <div className="popup-register">
            <p>Please enter all required information.</p>
            <button onClick={handleDataPopupClose}>Close</button>
          </div>
        </div>
      )}
      {showDuplicatePopup && (
        <div className="popup-logout-container">
          <div className="popup-register">
            <p>Username already exists. Please choose a different username.</p>
            <button onClick={handleDuplicatePopupClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
