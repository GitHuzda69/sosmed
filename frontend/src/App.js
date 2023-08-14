import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Settings from "./Setting";
import Message from "./Messages";
import Friends from "./Friendlist";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/messages" element={<Message />}></Route>
        <Route path="/friend" element={<Friends />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;