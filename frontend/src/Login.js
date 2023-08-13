import React, { useContext, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErrors] = useState(null);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
    } catch(err){
      setErrors(err.response.data);
      }}

  return (
    <div className="login-container">
      <div className="login-form">
        <form action="">
          <div
            className="form-group"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <strong style={{ paddingBottom: "10px" }}>
              <label>Username</label>
            </strong>
            <input
              type="username"
              placeholder="Enter Username"
              onChange={handleChange}
              name="username"
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
            <strong style={{ paddingBottom: "10px" }}>
              <label>Password</label>
            </strong>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={handleChange}
              name="password"
            />
            {err && err}
            <button
              type="submit"
              className="btn-white"
              style={{ marginTop: "20px" }}
              onClick={handleLogin}>
              Log In
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>Doesn't have an account?</p>
            <Link
              to="/signup"
              className="btn-red center"
              style={{ width: "60px" }}
            >
              Sign Up
            </Link>
            <Link to="/home" className="">
              Skip
            </Link>
          </div>
        </form>
      </div>
      <div className="social-icons">
        <i className="fa fa-facebook"></i>
        <i className="fa fa-twitter"></i>
        <i className="fa fa-instagram"></i>
      </div>
    </div>
  );
} 

export default Login;
