import React, { useState } from "react";
import { Icon } from "@iconify/react";

import "./Search.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (searchTerm) => {
    console.log("Pencarian:", searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <div className="search-bar-container">
        <input
          className="search-bar-input"
          type="text"
          placeholder="Search . . ."
          value={searchTerm}
          onChange={handleInputChange}
        />
        {searchTerm && (
          <button className="clear-search-button" onClick={handleClearSearch}>
            <Icon icon="ph:x-bold" color="white" width="22" height="22" />
          </button>
        )}
        <button className="search-bar-button" onClick={handleSearch}>
          <Icon
            icon="cil:search"
            color="white"
            rotate={1}
            width="22"
            height="22"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
