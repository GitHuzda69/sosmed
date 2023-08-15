import React from "react";
import "./FriendsList.css";
import Sidebar from "../../component/navbar/Sidebar";
import avatar1 from "../../assets/friend/friend1.jpg";
import avatar2 from "../../assets/friend/friend2.jpg";
import avatar3 from "../../assets/friend/friend3.jpg";
import avatar4 from "../../assets/friend/friend4.jpg";
import avatar5 from "../../assets/friend/friend5.jpeg";

const FriendList = () => {
  const friends = [
    {
      id: 1,
      name: "John Doe",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      avatar: avatar1,
    },
    {
      id: 2,
      name: "Jane Smith",
      description: "Pellentesque ac ligula in tellus feugiat placerat.",
      avatar: avatar2,
    },
    {
      id: 3,
      name: "Michael Johnson",
      description:
        "Vivamus euismod, purus eu placerat pellentesque, quam libero consectetur purus.",
      avatar: avatar3,
    },
    {
      id: 4,
      name: "Emily Williams",
      description:
        "Sed finibus lectus auctor, bibendum justo vel, congue eros.",
      avatar: avatar4,
    },
    {
      id: 5,
      name: "Daniel Brown",
      description:
        "Fusce interdum lorem vel neque suscipit, sit amet dignissim ex auctor.",
      avatar: avatar5,
    },
  ];

  return (
    <div>
      <Sidebar />
      <div className="friend-list">
        <h2>Friendlist</h2>
        {friends.map((friend) => (
          <div className="friend" key={friend.id}>
            <img src={friend.avatar} alt={friend.name} className="avatar" />
            <div className="friend-info">
              <h3>{friend.name}</h3>
              <p>{friend.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
