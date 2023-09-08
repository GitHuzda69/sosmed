import { useContext, useState } from "react";
import Comments from "../comments/Comments.js";
import "./Post.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import AuthContext from "../../context/authContext.js";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postid=" + post.id);
      return makeRequest.post("/likes", { postid: post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postid=" + post.id).then((res) => {
      return res.data;
    })
  );
  return (
    <div className="post-container">
      <div className="post">
        <div className="container">
          <div className="user">
            <div className="userinfo">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img className="profile" src={post.profilepic} alt="" />
              </Link>
              <div className="details">
                <span className="name">{post.username}</span>
                <span className="date">{moment(post.createdat).fromNow()}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="post-content">
          {post.desc && <p className="post-desc">{post.desc}</p>}
          {post.img && (
            <div className="post-img-container">
              <button
                className="img-button"
                onClick={() => setImagePopupOpen(true)}
              >
                <img className="post-img" src={"./data/" + post.img} alt="" />
              </button>
            </div>
          )}
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) : data && data.includes(currentUser.id) ? (
              <>
                <Icon
                  className="icon"
                  icon="mdi:heart"
                  width={25}
                  height={25}
                  color={"red"}
                  onClick={handleLike}
                />
                <h3>{data.length} Likes</h3>
              </>
            ) : (
              <Icon
                className="icon"
                icon="mdi:heart-outline"
                width={25}
                height={25}
                color={"black"}
                onClick={handleLike}
              />
            )}
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
        {commentOpen && <Comments postid={post.id} />}
      </div>
      {imagePopupOpen && (
        <div className="image-popup">
          <button
            className="close-button"
            onClick={() => setImagePopupOpen(false)}
          >
            <Icon icon="ph:x-bold" color="black" width={40} height={40} />
          </button>
          <img className="popup-img" src={"./data/" + post.img} alt="" />
        </div>
      )}
    </div>
  );
};

export default Post;
