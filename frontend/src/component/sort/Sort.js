import React, { useState } from "react";
import { Icon } from "@iconify/react";

import "./Sort.css";

const Sort = () => {
  return (
    <div>
      <button className="sort-post">
        <Icon icon="fluent:arrow-sort-24-filled" width={30} height={30} />
        Sort Post
      </button>
    </div>
  );
};

export default Sort;
