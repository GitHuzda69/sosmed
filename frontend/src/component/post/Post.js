import { useState } from "react";
import Comments from "../comments/Comments.js";
import "./Post.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Post = ({ post }) => {
  //SEMENTARA
  const liked = true;

  const [commentOpen, setCommentOpen] = useState(false);

  return (
    <div className="post-container">
      <div className="post">
        <div className="container">
          <div className="user">
            <div className="userinfo">
              <Link
                to={"/profile/${post.userId}"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img className="profile" src={post.profilePic} alt="" />
                <div className="details">
                  <span className="name">{post.name}</span>
                  <span className="date">Baru saja</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="post-content">
          <p className="post-desc">{post.desc}</p>
          {post.img && <img className="post-img" src={post.img} alt="" />}
        </div>
        <div className="info">
          <div className="item">
            {liked ? (
              <Icon
                className="icon"
                icon="mdi:heart-outline"
                width={25}
                height={25}
                color={"black"}
              />
            ) : (
              <Icon icon="mdi:heart" width={25} height={25} color={"red"} />
            )}
            <h3>12 Likes</h3>
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <Icon
              className="icon"
              icon="ant-design:message-filled"
              width={25}
              height={25}
            />
            <h3>12 Comments</h3>
          </div>
          <div className="item">
            <Icon className="icon" icon="mdi:share" width={30} height={30} />
            <h3>Share</h3>
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
