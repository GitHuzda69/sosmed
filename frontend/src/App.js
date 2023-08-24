import Login from "./pages/login/Login.js";
import Signup from "./pages/register/Register.js";
import Home from "./pages/home/Home.js";
import Settings from "./pages/setting/Setting.js";
import Message from "./pages/messages/Messages.js";
import Friends from "./pages/friendlist/FriendsList.js";
import Profile from "./pages/profile/Profile.js";
import { RouterProvider, createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Sidebar from "./component/Leftbar/Leftbar.js";
import Rightbar from "./component/rightbar/Rightbar.js";
import SearchBar from "./component/search/Search.js";
import AuthContext from "./context/authContext.js";
import { useContext } from "react";

function App() {
  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient} > 
      <div>
        <SearchBar/>
        <div style={{ display: "flex"}}>
          <Sidebar/>
          <Outlet/>
          <Rightbar/>
        </div>
      </div>
      </QueryClientProvider>
    )
  }
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => { 
    if (!currentUser) {
      return <Navigate to="/login" />;    }
  
  return children;
    };

  const router = createBrowserRouter([
    {
      path:"/", element: <Layout/>,
      children: [{
        path: "/",  
        element: <Home />
      }],
    },{
      path:"/login", element: <Login />
    },
    {
      path:"/signup", element: <Signup />
    },{
      path:"/settings", element: <Settings />
    },{
      path:"/messages", element: <Message />
    },{
      path:"/friend", element: <Friends />
    },{
      path:"/profile/:id", element: <Profile/>
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;