import React, { useState } from "react";
import { Icon } from "@iconify/react";

import "./Search.css";
import { useNavigate } from "react-router";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const navigate = useNavigate();
  const handleSearch = (searchTerm) => {
    const searchTermValue = searchTerm.target.value;
    navigate(`/search/${searchTermValue}`);
    window.location.reload(true);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch(e);
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar-container">
        <Icon icon="octicon:search-16" className="searchbar-button" width="22" height="22" />
        <input className="search-bar-input" type="text" style={{ fontFamily: "Inter" }} placeholder="Search . . ." value={searchTerm} onChange={handleInputChange} onKeyDown={handleEnterKey} />
        {searchTerm && (
          <button className="clear-search-button" onClick={handleClearSearch}>
            <Icon icon="ph:x-bold" width="22" height="22" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
