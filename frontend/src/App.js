import Login from "./pages/login/Login.js";
import Google from "./pages/login/Google.js";
import OTP from "./pages/login/OTP.js";
import Signup from "./pages/register/Register.js";
import GSignup from "./pages/register/Google.js";
import Home from "./pages/home/Home.js";
import Message from "./pages/messages/Messages.js";
import Friends from "./component/friendlist/FriendsList.js";
import Profile from "./pages/profile/Profile.js";
import Fyp from "./pages/Fyp/Fyp.js";
import Notif from "./pages/notif/notif.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./pages/home/Home.css";
import AuthContext from "./context/authContext.js";
import { useContext, useEffect } from "react";
import WebFont from "webfontloader";

function App() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    document.title = "Sync, Manage, and Direct";
    const favicon = document.querySelector(`link[rel="icon"]`);
    favicon.href = PF + "Logo_BNW.webp";
    WebFont.load({
      google: {
        families: ["Inter"],
      },
    });
  }, []);

  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/messages" element={user ? <Message /> : <Login />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/fyp/profile/:username" element={<Profile />} />
        <Route path="/login/profile/:username" element={<Profile />} />
        <Route path="/friend/:username" element={user ? <Friends /> : <Login />} />
        <Route path="/fyp" element={user ? <Fyp /> : <Login />} />
        <Route path="/notif" element={user ? <Notif /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/google" element={user ? <Home /> : <Google />} />
        <Route path="/google/signup" element={user ? <Home /> : <GSignup />} />
        <Route path="/google/otp" element={user ? <Home /> : <OTP />} />
      </Routes>
    </Router>
  );
}

export default App;
