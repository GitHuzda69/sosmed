import Login from "./pages/login/Login.js";
import Google from "./pages/login/Google.js";
import OTP from "./pages/login/OTP.js";
import Signup from "./pages/register/Register.js";
import GSignup from "./pages/register/Google.js";
import Facebook from "./pages/login/Facebook.js";
import Home from "./pages/home/Home.js";
import Message from "./pages/messages/Messages.js";
import Friends from "./component/friendlist/FriendsList.js";
import Profile from "./pages/profile/Profile.js";
import Fyp from "./pages/Fyp/Fyp.js";
import Result from "./pages/Result/Result.js";
import Notif from "./pages/notif/notif.js";
import TOS from "./pages/tos/tos.js";
import NotFound from "./pages/NotFound/NotFound.js";
import Connect from "./pages/connect/connect.js";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./pages/home/Home.css";
import AuthContext from "./context/authContext.js";
import { useContext, useEffect, useState } from "react";
import WebFont from "webfontloader";
import PF from "./Logo_BNW.webp";
import { io } from "socket.io-client";

function App() {
  useEffect(() => {
    document.title = "Sync, Manage, and Direct";
    const favicon = document.querySelector(`link[rel="icon"]`);
    favicon.href = PF;
    WebFont.load({
      google: {
        families: ["Inter"],
      },
    });
  }, []);

  const { user } = useContext(AuthContext);

  const socket = io("http://localhost:8900");

  useEffect(() => {
    socket.emit("addUser", user?._id);
    socket.on("getUsers", (u) => {
      console.log(u);
    });
  }, [socket, user]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />} />
        <Route exact path="/messages" element={user ? <Message /> : <Login />} />
        <Route path="/search/:keyword" element={user ? <Result /> : <Login />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/fyp/profile/:username" element={<Profile />} />
        <Route path="/login/profile/:username" element={<Profile />} />
        <Route path="/friend/:username" element={user ? <Friends /> : <Login />} />
        <Route exact path="/fyp" element={user ? <Fyp /> : <Login />} />
        <Route exact path="/notif" element={user ? <Notif /> : <Login />} />
        <Route exact path="/connect" element={user ? <Connect /> : <Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={user ? <Home /> : <Login />} />
        <Route exact path="/google" element={user ? <Home /> : <Google />} />
        <Route path="/facebook" element={user ? <Home /> : <Facebook />} />
        <Route exact path="/google/signup" element={user ? <Home /> : <GSignup />} />
        <Route exact path="/google/otp" element={user ? <Home /> : <OTP />} />
        <Route exact path="/TermsOfServices" element={<TOS />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/*" />} />
      </Routes>
    </Router>
  );
}

export default App;
