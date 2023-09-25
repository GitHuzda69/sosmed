import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { Icon } from "@iconify/react";
import "./Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErrors] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }
      navigate("/");
    } catch (err) {
      if (err.response) {
        setErrors(err.response.data);
      }
    }
  };
  useEffect(() => {
    const rememberMeStatus = localStorage.getItem("rememberMe");
    if (rememberMeStatus === "true") {
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="login-pages">
      <div className="login-containers">
        <h1>Selamat Datang, silahkan masukkan pilih metode Log in Anda</h1>
        <div className="login-forms">
          <h3>Log in</h3>
          <form action="">
            <div
              className="form-groups"
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
                className="input-login"
                type="username"
                placeholder="Enter Username"
                onChange={handleChange}
                name="username"
              />
            </div>
            <div
              className="form-groups"
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
                className="input-login"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                onChange={handleChange}
                name="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="show-password-button"
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
              <div className="form-groups">
                <label className="checkbox-container checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <h4>Remember Me</h4>
                </label>
              </div>
              <button type="button" className="forgot-password-button">
                Forgot Password
              </button>
              <span className="loginError">{err && err}</span>
              <button
                type="submit"
                className="login"
                style={{ marginTop: "20px" }}
                onClick={handleLogin}
              >
                Sign in
              </button>
            </div>
            <div className="or-divider">
              <div className="divider-line"></div>
              <div className="divider-text">OR</div>
              <div className="divider-line"></div>
            </div>
            <button
              type="submit"
              className="login-else"
              style={{ marginTop: "20px" }}
              onClick={handleLogin}
            >
              <span className="login-else-icon">
                <Icon icon="devicon:google" width={20} height={20} />
              </span>
              <h5>Continue with Google</h5>
            </button>
            <button
              type="submit"
              className="login-else"
              style={{ marginTop: "20px" }}
              onClick={handleLogin}
            >
              <span className="login-else-icon">
                <Icon
                  icon="brandico:facebook-rect"
                  width={20}
                  height={20}
                  color="rgb(43, 88, 209)"
                />
              </span>
              <h5>Continue with Facebook</h5>
            </button>
            <div
              className="signup"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <p>Doesn't have an account?</p>
              <Link
                to="/signup"
                className="button-signup"
                style={{ width: "60px" }}
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
