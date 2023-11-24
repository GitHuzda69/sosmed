import Login from "./pages/login/Login.js";
import Google from "./pages/login/Google.js";
import OTP from "./pages/login/OTP.js";
import Signup from "./pages/register/Register.js";
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
  useEffect(() => {
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
        <Route path="/friend" element={user ? <Friends /> : <Login />} />
        <Route path="/fyp" element={user ? <Fyp /> : <Login />} />
        <Route path="/notif" element={user ? <Notif /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/login/google" element={user ? <Home /> : <Google />} />
        <Route path="/login/google/otp" element={user ? <Home /> : <OTP />} />
      </Routes>
    </Router>
  );
}

export default App;
