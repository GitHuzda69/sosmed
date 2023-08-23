import "./Rightbar.css";
import { Icon } from "@iconify/react";

import avatar1 from "../../assets/friend/friend1.jpg";
import avatar2 from "../../assets/friend/friend2.jpg";
import avatar3 from "../../assets/friend/friend3.jpg";
import avatar4 from "../../assets/friend/friend4.jpg";
import avatar5 from "../../assets/friend/friend5.jpeg";
import profilimage from "../../assets/profil.jpg";

const Rightbar = () => {
  const rightbar = [
    {
      id: 1,
      name: "Jeou",
      userId: 1,
      profilePic: profilimage,
      online: "Online ",
      status: 1,
    },
    {
      id: 2,
      name: "Bukan",
      userId: 2,
      profilePic: avatar3,
      online: "Online 44 minutes ago",
      status: 0,
    },
    {
      id: 3,
      name: "Orang",
      userId: 3,
      profilePic: avatar4,
      online: "Online 7 hours ago",
      status: 0,
    },
    {
      id: 4,
      name: "Biasa",
      userId: 4,
      profilePic: avatar2,
      online: "Online ",
      status: 1,
    },
    {
      id: 5,
      name: "Lalo",
      userId: 5,
      profilePic: avatar1,
      online: "Online 12 hours ago",
      status: 0,
    },
    {
      id: 6,
      name: "Bila",
      userId: 6,
      profilePic: avatar5,
      online: "Online ",
      status: 1,
    },
    {
      id: 7,
      name: "Yoko",
      userId: 7,
      profilePic: avatar2,
      online: "Online 2 days ago",
      status: 0,
    },
    {
      id: 8,
      name: "Asas",
      userId: 8,
      profilePic: profilimage,
      online: "Online ",
      status: 1,
    },
  ];
  return (
    <div className="rightBar">
      <h2>Friends</h2>
      <div className="rightBarContainer">
        {rightbar.map((friend) => (
          <div key={friend.id} className="rightBarItem">
            <div className="rightBarUser">
              <div className="rightBarUserInfo">
                <img
                  className="rightBarImg"
                  src={friend.profilePic}
                  alt={friend.name}
                />
                <div
                  className={`statusDot ${
                    friend.status === 1 ? "greenDot" : "grayDot"
                  }`}
                />
              </div>
              <p
                className={`rightBarUserStatus ${
                  friend.status === 1 ? "rightBarUserStatus2" : ""
                }`}
              >
                <span className="rightBarName">{friend.name}</span>
                {friend.online}
              </p>
            </div>
            <button className="rightBarButton">
              <Icon
                icon="ion:chatbox-ellipses-outline"
                width={25}
                height={25}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rightbar;
