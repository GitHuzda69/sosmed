import Login from "./pages/login/Login.js";
import Signup from "./pages/register/Register.js";
import Home from "./pages/home/Home.js";
import Message from "./pages/messages/Messages.js";
import Friends from "./pages/friendlist/FriendsList.js";
import Profile from "./pages/profile/Profile.js";
import Fyp from "./pages/Fyp/Fyp.js";
import Notif from "./pages/notif/notif.js";
import {
  BrowserRouter as Router,
  Route,
  Outlet,
  Routes,
} from "react-router-dom";
import "./pages/home/Home.css";
import Sidebar from "./component/Leftbar/Leftbar.js";
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

  const Layout = () => {
    return (
          <div>
            <Sidebar />
            <Outlet />
          </div>
    );
  };

  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Layout /> : <Login />}>
          <Route path="/messenger" element={!user ? <Message /> : <Login />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/friend" element={user ? <Friends /> : <Login/>} />
          <Route path="/fyp" element={user ? <Fyp /> : <Login />} />
          <Route path="/notif" element={user ? <Notif /> : <Login />} />
        </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={user ? <Home/> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
