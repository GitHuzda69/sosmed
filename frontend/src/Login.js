import React, { useState } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);
    if (err.username === "" && err.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          if (res.data === "Success") {
            navigate("/home");
          } else {
            alert("No Record data exist");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form action="" onSubmit={handleSubmit}>
          <div className="form-group">
            <strong>
              <label>Username</label>
            </strong>
            <input
              type="username"
              placeholder="Enter Username"
              onChange={handleInput}
              name="username"
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>
          <div className="form-group">
            <strong>
              <label>Password</label>
            </strong>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={handleInput}
              name="password"
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn-white">
            Log In
          </button>
          <p>Doesn't have an account?</p>
          <Link to="/signup" className="btn-red center">
            Sign Up
          </Link>
          <Link to="/home" className="">
            Skip
          </Link>
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
