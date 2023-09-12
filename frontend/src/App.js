import Login from "./pages/login/Login.js";
import Signup from "./pages/register/Register.js";
import Home from "./pages/home/Home.js";
import Message from "./pages/messages/Messages.js";
import Friends from "./pages/friendlist/FriendsList.js";
import Profile from "./pages/profile/Profile.js";
import Update from "./component/Update/Update.js";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./pages/home/Home.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Sidebar from "./component/Leftbar/Leftbar.js";
import AuthContext from "./context/authContext.js";
import { useContext } from "react";

function App() {
  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <div style={{ display: "flex" }}>
            <Sidebar />
            <Outlet />
          </div>
        </div>
      </QueryClientProvider>
    );
  };
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/messages",
          element: <Message />,
        },
        {
          path: "/friend",
          element: <Friends />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
