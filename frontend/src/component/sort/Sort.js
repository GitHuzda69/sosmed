import React, { useState } from "react";
import { Icon } from "@iconify/react";

import "./Sort.css";
import { Link } from "react-router-dom";

const Sort = () => {
  return (
    <div>
      <Link to="/fyp">
      <button className="sort-post">
        <Icon icon="fluent:arrow-sort-24-filled" width={30} height={30} />
        Sort Post
      </button>
      </Link>
    </div>
  );
};

export default Sort;
