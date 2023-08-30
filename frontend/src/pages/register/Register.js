import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const Register = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [err, setErrors] = useState(null);

  useEffect(() => {
    const rememberMeStatus = localStorage.getItem("rememberMe");
    if (rememberMeStatus === "true") {
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setErrors(err);
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  return (
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
              type="username"
              placeholder="Enter Your Username"
              name="username"
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
              type="email"
              placeholder="Enter Your Active Email "
              name="email"
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
              name="password"
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

          {err && <span>{err.response.data}</span>}
          <label className="checkbox-container-signup checkbox-label-signup">
            <input
              type="checkbox"
              className="checkbox-input-signup"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <h4>
              I Agree with{" "}
              <button type="button" className="terms-button">
                Terms & Services
              </button>{" "}
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
  );
};

export default Register;
