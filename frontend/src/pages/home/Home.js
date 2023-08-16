import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import Sidebar from "../../component/navbar/Sidebar";
import SearchBar from "../../component/search/Search";
import Post from "../../component/post/Post";
import profilimage from "../../assets/profil.jpg";
import "./Home.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        <Post />
      </div>
      </QueryClientProvider>
      )
      }

export default Home;
