import React, { useState } from "react";
import { Icon } from "@iconify/react";

import "./Setting-post.css";

const SettingPost = () => {
  return (
    <div>
      <button className="setting-post">
        <Icon icon="solar:settings-bold" width={30} height={30} />
      </button>
    </div>
  );
};

export default SettingPost;
