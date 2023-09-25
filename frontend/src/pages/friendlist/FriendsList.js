import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./FriendsList.css";
import Sidebar from "../../component/Leftbar/Leftbar";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";

import avatar1 from "../../assets/friend/friend1.jpg";
import avatar2 from "../../assets/friend/friend2.jpg";
import avatar3 from "../../assets/friend/friend3.jpg";
import avatar4 from "../../assets/friend/friend4.jpg";
import avatar5 from "../../assets/friend/friend5.jpeg";

const FriendList = ({ relationships }) => {
  const friends = [
    {
      id: 1,
      name: "John Doe",
      mutual: "19 Mutual friends",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      avatar: avatar1,
    },
    {
      id: 2,
      name: "Jane Smith",
      mutual: "10 Mutual friends",
      description: "Pellentesque ac ligula in tellus feugiat placerat.",
      avatar: avatar2,
    },
    {
      id: 3,
      name: "Michael Johnson",
      mutual: "12 Mutual friends",
      description:
        "Vivamus euismod, purus eu placerat pellentesque, quam libero consectetur purus.",

      avatar: avatar3,
    },
    {
      id: 4,
      name: "Emily Williams",
      mutual: "9 Mutual friends",
      description:
        "Sed finibus lectus auctor, bibendum justo vel, congue eros.",
      avatar: avatar4,
    },
    {
      id: 5,
      name: "Daniel Brown",
      mutual: "9 Mutual friends",
      description:
        "Fusce interdum lorem vel neque suscipit, sit amet dignissim ex auctor.",
      avatar: avatar5,
    },
    {
      id: 6,
      name: "Michael Johnson",
      mutual: "12 Mutual friends",
      description:
        "Vivamus euismod, purus eu placerat pellentesque, quam libero consectetur purus.",
      avatar: avatar3,
    },
    {
      id: 7,
      name: "Emily Williams",
      mutual: "17 Mutual friends",
      description:
        "Sed finibus lectus auctor, bibendum justo vel, congue eros.",
      avatar: avatar4,
    },
    {
      id: 8,
      name: "Daniel Brown",
      mutual: "6 Mutual friends",
      description:
        "Fusce interdum lorem vel neque suscipit, sit amet dignissim ex auctor.",
      avatar: avatar5,
    },
    {
      id: 9,
      name: "Daniel Brown",
      mutual: "12 Mutual friends",
      description:
        "Fusce interdum lorem vel neque suscipit, sit amet dignissim ex auctor.",
      avatar: avatar5,
    },
    {
      id: 10,
      name: "Michael Johnson",
      mutual: "25 Mutual friends",
      description:
        "Vivamus euismod, purus eu placerat pellentesque, quam libero consectetur purus.",
      avatar: avatar3,
    },
    {
      id: 11,
      name: "Emily Williams",
      mutual: "29 Mutual friends",
      description:
        "Sed finibus lectus auctor, bibendum justo vel, congue eros.",
      avatar: avatar4,
    },
    {
      id: 12,
      name: "Daniel Brown",
      mutual: "29 Mutual friends",
      description:
        "Fusce interdum lorem vel neque suscipit, sit amet dignissim ex , sit amet dignissim ex , sit amet dignissim ex , sit amet dignissim ex auctor.",
      avatar: avatar5,
    },
  ];
  const [popupPosition, setPopupPosition] = useState({
    visible: false,
    top: 0,
    left: 0,
  });

  const [popupVisibility, setPopupVisibility] = useState(
    new Array(friends.length).fill(false)
  );

  const togglePopup = (index, event) => {
    const newPopupVisibility = [...popupVisibility];
    newPopupVisibility[index] = !newPopupVisibility[index];
    setPopupVisibility(newPopupVisibility);
    const buttonRect = event.target.getBoundingClientRect();
    const popupTop = buttonRect.top - 5;
    const popupLeft = buttonRect.left - 153;

    setPopupPosition({
      visible: !popupPosition.visible,
      top: popupTop,
      left: popupLeft,
    });
  };

  const {
    isLoading,
    error,
    data: friendData,
  } = useQuery(["friend"], () =>
    makeRequest.get("/friends").then((res) => {
      return res.data;
    })
  );

  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };
  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  return (
    <div>
      <div className="friendlist-container">
        <div className="friendlist-header">
          <h2>Friendlist</h2>
          <button className="button-info">
            <Icon
              icon="fluent:person-alert-20-filled"
              color="black"
              width={25}
              height={25}
            />
          </button>
        </div>
        <div className="friendlist">
          {error
            ? `Something went wrong`
            : isLoading
            ? "loading"
            : friendData.map((friend) => (
                <div className="friend" key={friend.id}>
                  <div className="friend-avatar">
                    <img
                      src={"./data/" + friend.profilepic}
                      alt={friend.displayname}
                      className="avatar"
                    />
                  </div>
                  <div className="friend-info-details">
                    <h3>{friend.displayname}</h3>
                    <button className="button-popup">
                      <Icon icon="tabler:dots" width={20} height={20} />
                    </button>
                  </div>
                  <div className="friend-desc">
                    <p>{friend.description}</p>
                  </div>
                </div>
              ))}
        </div>
        {popupPosition.visible && (
          <div
            className="popup"
            style={{
              top: `${popupPosition.top}px`,
              left: `${popupPosition.left}px`,
            }}
          >
            <button className="icon-button">
              <Icon icon="heroicons-solid:chat" width={25} height={25} />
              Messages
            </button>
            <button className="icon-button">
              <Icon icon="bi:person-dash-fill" width={20} height={20} />
              Unfriend
            </button>
            <button className="icon-button" style={{ color: "red" }}>
              <Icon icon="bi:person-x-fill" width={20} height={20} />
              Block
            </button>
          </div>
        )}
      </div>
      <Sidebar toggleSettings={toggleSettings} toggleLogout={toggleLogout} />
      {settingOpen && (
        <>
          <div className="settings-overlay" />
          <div className="settings-container">
            <Settings onClose={toggleSettings} />
          </div>
        </>
      )}
      {logoutOpen && (
        <>
          <div className="popup-logout-container" />
          <div className="popup-logout">
            <Logout onClose={toggleLogout} />
          </div>
        </>
      )}
    </div>
  );
};

export default FriendList;
