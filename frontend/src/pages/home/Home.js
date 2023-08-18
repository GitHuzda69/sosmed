import React from "react";
import Sidebar from "../../component/navbar/Sidebar";
import SearchBar from "../../component/search/Search";
import "./Home.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Posts from "../../component/posts/Posts";
import Post from "../../component/post/Post";

const queryClient = new QueryClient();

function Home() {
  const handleSearch = (searchTerm) => {
    console.log("Pencarian:", searchTerm);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Sidebar />
        <SearchBar onSearch={handleSearch} />
        <Posts />
        {/* <Post /> */}
      </div>
    </QueryClientProvider>
  );
}

export default Home;
