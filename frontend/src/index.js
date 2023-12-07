import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./pages/home/Home.css";
import { AuthContextProvider } from "./context/authContext";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
  </React.StrictMode>
);
