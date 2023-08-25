import React from "react";
import Righbar from "../../component/rightbar/Rightbar.js";
import SearchBar from "../../component/search/Search";
import "./Home.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Posts from "../../component/posts/Posts";
import Upload from "../../component/Upload/Upload.js";


const queryClient = new QueryClient();

function Home() {
  const handleSearch = (searchTerm) => {
    console.log("Pencarian:", searchTerm);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Righbar />
        <SearchBar/>
        <Upload/>
        <Posts />
        <Upload />
      </div>
    </QueryClientProvider>
  );
}

export default Home;
