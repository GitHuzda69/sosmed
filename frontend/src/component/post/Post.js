import "./Post.css";
import React, { useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import moment from "moment";
import Comments from "../comments/Comments.js";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [postOptionOpen, setpostOptionOpen] = useState(false);
  const [postOptionButtonPosition, setPostOptionButtonPosition] =
    useState(null);
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
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
  const deleteMutation = useMutation(
    (postid) => {
      return makeRequest.delete("/posts/" + postid);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };
  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postid=" + post.id).then((res) => {
      return res.data;
    })
  );
  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followeduserid=" + userId).then((res) => {
        return res.data;
      })
  );
  const followMutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );
  const handleFollow = () => {
    followMutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="post-container">
      <div className="post">
        <div className="container">
          <div className="user">
            <div className="userinfo">
              <Link
                to={`/profile/${post.userid}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  className="profile"
                  src={"/data/" + post.profilepic}
                  alt=""
                />
              </Link>
              <div className="details">
                <span className="name">{post.displayname}</span>
                <span className="date">{moment(post.createdat).fromNow()}</span>
              </div>
              <button
                className="opsi-post-button"
                onClick={(e) => {
                  setPostOptionButtonPosition(e.target.getBoundingClientRect());
                  setpostOptionOpen(!postOptionOpen);
                }}
              >
                <Icon icon="tabler:dots" width={20} height={20} />
              </button>
            </div>
            {postOptionOpen ? (
              <div>
                {post.userid !== currentUser.id ? (
                  <div className="post-option-popup-other">
                    <button
                      style={{
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "2px",
                        gap: "5px",
                      }}
                    >
                      <Icon
                        icon="ion:chatbox-ellipses-outline"
                        width={20}
                        height={20}
                      />
                      Message
                    </button>
                    <button
                      onClick={handleFollow}
                      style={{
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "-3px",
                        gap: "5px",
                      }}
                    >
                      <Icon
                        icon="ic:round-person-add"
                        hFlip={true}
                        width={20}
                        height={20}
                      />
                      Follow
                    </button>
                  </div>
                ) : (
                  <div className="post-option-popup-self">
                    <button
                      onClick={handleDelete}
                      style={{
                        color: "red",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "2px",
                        gap: "2px",
                      }}
                    >
                      <Icon icon="mdi:delete" height={20} width={20} />
                      Delete This Post
                    </button>
                    <button
                      style={{
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "-3px",
                        gap: "5px",
                      }}
                    >
                      {" "}
                      <Icon icon="tabler:edit" height={20} width={20} />
                      Edit Post
                    </button>
                  </div>
                )}
              </div>
            ) : null}
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
                <img className="post-img" src={"/data/" + post.img} alt="" />
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
            <h3>Comments</h3>
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
