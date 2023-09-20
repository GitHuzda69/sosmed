import "./Post.css";
import React, { useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import moment from "moment";
import Commento from "../Commento/Commento.js";
import Comments from "../comments/Comments.js";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPostImg, setSelectedPostImg] = useState(null);
  const [postOptionOpen, setpostOptionOpen] = useState(false);
  const [postEditOpen, setPostEditOpen] = useState(false);
  const [postOptionButtonPosition, setPostOptionButtonPosition] =
    useState(null);
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const [texts, setTexts] = useState({
    desc: post.desc,
  });
  const { isLoading, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postid=" + post.id).then((res) => {
      return res.data;
    })
  );
  const { data: relationshipData } = useQuery(["relationship"], () =>
    makeRequest.get("/relationships?followeduserid=" + userId).then((res) => {
      return res.data;
    })
  );
  const queryClient = useQueryClient();
  const likeMutation = useMutation(
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
  const editMutation = useMutation(
    (post) => {
      return makeRequest.put("/posts/" + post.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
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
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleLike = () => {
    likeMutation.mutate(data.includes(currentUser.id));
  };
  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    let imgUrl;

    imgUrl = img ? await upload(img) : post.img;

    editMutation.mutate({ ...texts, img: imgUrl });
    setPostEditOpen(false);
  };
  const handleFollow = () => {
    followMutation.mutate(relationshipData.includes(currentUser.id));
  };

  const openPopup = (imgUrl) => {
    setSelectedPostImg(imgUrl);
    setPopupOpen(true);
  };
  const closePopup = () => {
    setSelectedPostImg(null);
    setPopupOpen(false);
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
                      className="edit-post1"
                      style={{
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "-4px",
                        gap: "5px",
                      }}
                    >
                      <button
                        className="edit-post2"
                        style={{
                          height: "14px",
                          display: "flex",
                          alignItems: "center",
                          marginTop: "5px",
                          gap: "5px",
                        }}
                        onClick={() => {
                          setPostEditOpen(!postEditOpen);
                        }}
                      >
                        <Icon icon="tabler:edit" height={20} width={20} />
                        Edit Post
                      </button>
                      {postEditOpen && (
                        <div className="edit-post">
                          <form className="edit-post-content">
                            <input type="desc" name="desc" />
                            <input type="file" name="img" />
                            <button onClick={handleEdit}>Post</button>
                          </form>{" "}
                        </div>
                      )}
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
                onClick={() => openPopup(`/data/${post.img}`)}
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
                <h3>{data && data.length} Likes</h3>
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
      {popupOpen && (
        <div className="popup-overlay-post" onClick={closePopup}>
          <div className="popup-post">
            {selectedPostImg && (
              <img
                className="popup-image-post"
                src={selectedPostImg}
                alt="post-img"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
