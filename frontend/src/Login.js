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
              onChange={handleInput}
              name="username"
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
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
              onChange={handleInput}
              name="password"
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
            <button
              type="submit"
              className="btn-white"
              style={{ marginTop: "20px" }}
            >
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
