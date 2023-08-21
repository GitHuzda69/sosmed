import "./Comments.css";
import avatar1 from "../../assets/profil.jpg";
import friend1 from "../../assets/friend/friend1.jpg";
import friend5 from "../../assets/friend/friend5.jpeg";
import friend2 from "../../assets/friend/friend2.jpg";

import { useContext } from "react";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";

const Comments = () => {
  const { currentUser } = useContext(AuthContext);

  // DATA DUMMY
  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet conseceru adipiscing elist",
      name: "User 1",
      userId: "1",
      profilePic: friend1,
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet conseceru adipiscing elist",
      name: "User 2",
      userId: "2",
      profilePic: friend2,
    },
    {
      id: 3,
      desc: "Lorem ipsum dolor sit amet conseceru adipiscing elist",
      name: "User 3",
      userId: "3",
      profilePic: friend5,
    },
    {
      id: 4,
      desc: "Lorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elist",
      name: "User 3",
      userId: "3",
      profilePic: friend5,
    },
  ];

  return (
    <div className="comments">
      <div className="write">
        <img src={comments.profilePic} alt="" />
        <input
          className="input-comment"
          type="text"
          placeholder="Write a comment"
        />
        <button className="button-comment">
          <Icon icon="material-symbols:send" height={30} width={30} />
        </button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img className="comments-pic" src={comment.profilePic} />
          <div className="comment-info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="comment-date">Baru saja</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
