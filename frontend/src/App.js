import Login from "./pages/login/Login.js";
import Signup from "./pages/register/Register.js";
import Home from "./pages/home/Home.js";
import Settings from "./pages/setting/Setting.js";
import Message from "./pages/messages/Messages.js";
import Friends from "./pages/friendlist/FriendsList.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/messages" element={<Message />}></Route>
        <Route path="/friend" element={<Friends />}></Route>
        <Route path="/profile/:id" element ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;