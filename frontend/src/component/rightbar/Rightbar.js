import "./Rightbar.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";

const Rightbar = () => {
  const { isLoading, error ,data: friendData } = useQuery(["friend"], () =>
    makeRequest.get("/friends").then((res) => {
      return res.data;
    })
  );
  return (
    <div className="rightBar">
      <h2>Friends</h2>
      <div className="rightBarContainer">
        {error
        ? `Something went wrong`
        : isLoading
        ? "loading" : friendData.map((friend) => (
          <div key={friend.userid} className="rightBarItem">
            <div className="rightBarUser">
              <div className="rightBarUserInfo">
                <img
                  className="rightBarImg"
                  src={"./data/" + friend.profilepic}
                  alt={friend.displayname}
                />
                <div
                  className={`statusDot ${
                    "grayDot"
                  }`}
                />
              </div>
              <p
                className={`rightBarUserStatus ${
                "grayDot"
                }`}
              >
                <span className="rightBarName">{friend.displayname}</span>
              </p>
            </div>
            <Link to="/messages">
            <button className="rightBarButton">
              <Icon
                icon="ion:chatbox-ellipses-outline"
                width={25}
                height={25}
              />
            </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rightbar;
