import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./pages/home/Home.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/authContext";

const rootElement = document.getElementById("root");
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
