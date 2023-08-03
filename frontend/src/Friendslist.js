import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

function Friendslist() {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <div>
        <button>
          <Link
            to="/home"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              icon="mingcute:back-2-fill"
              width={29}
              height={29}
              color="black"
            />
          </Link>
        </button>
      </div>
      Teman Konco
    </div>
  );
}

export default Friendslist;
