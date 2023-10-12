import "./Post.css";
import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import moment from "moment";
import Commento from "../Commento/Commento.js";

import defaultprofile from "../../assets/profile/default_avatar.png";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPostImg, setSelectedPostImg] = useState(null);
  const [postOptionOpen, setpostOptionOpen] = useState(false);
  const [postEditOpen, setPostEditOpen] = useState(false);
  const [editedDesc, setEditedDesc] = useState(post.desc);
  const [editedImg, setEditedImg] = useState(null);
  const [isDescEmpty, setIsDescEmpty] = useState(false);
  const descInputRef = useRef(null);
  const [originalDesc, setOriginalDesc] = useState(post.desc);
  const [postOptionButtonPosition, setPostOptionButtonPosition] =
    useState(null);
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);
  const { isLoading, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postid=" + post.id).then((res) => {
      return res.data;
    })
  );
  const userId = post.userid;
  const { data: relationshipData } = useQuery(["relationship"], () =>
    makeRequest.get("/relationships?followeduserid=" + userId).then((res) => {
      return res.data;
    })
  );

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

  const messageMutation = useMutation(
    (userId) => {
      return makeRequest.post("/conversations/" + userId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["conversation"]);
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

    if (!post.img && editedDesc.trim() === "") {
      setIsDescEmpty(true);
      return;
    }

    const editedPost = {
      ...post,
      desc: editedDesc,
      img: editedImg ? await upload(editedImg) : post.img,
    };

    try {
      await makeRequest.put("/posts/" + editedPost.id, editedPost);
      setPostEditOpen(false);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const handleEnterKey = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (descInputRef.current) {
          descInputRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleEnterKey);

    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, []);

  const handleFollow = () => {
    followMutation.mutate(relationshipData.includes(currentUser.id));
  };

  const navigate = useNavigate();
  const handleMessage = () => {
    messageMutation.mutate(userId);
    navigate("/messages");
  };

  const openPopup = (imgUrl) => {
    setSelectedPostImg(imgUrl);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedPostImg(null);
    setPopupOpen(false);
  };

  const handleRemoveImg = async () => {
    try {
      const updatedPost = {
        ...post,
        img: null,
      };

      await makeRequest.put(`/posts/${post.id}`, updatedPost);
      setEditedImg(null);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={`post-container ${post.img ? "has-image" : ""}`}>
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
                  src={
                    post && post.profilepic
                      ? "/data/" + post.profilepic
                      : defaultprofile
                  }
                  alt=""
                />
              </Link>
              <div className="details">
                <span className="name">{post.displayname}</span>
                <span className="date">{moment(post.createdat).fromNow()}</span>
              </div>
              <div className="options">
                {postOptionOpen ? (
                  <div className="post-option-popup">
                    {post.userid !== currentUser.id ? (
                      <div className="post-option-popup-other">
                        <button
                          onClick={handleMessage}
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
                          {relationshipData.includes(currentUser.id)
                            ? "Following"
                            : "Follow"}
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
                              {isDescEmpty && (
                                <div className="edit-post-warn">
                                  <button
                                    className="close-warn-post"
                                    onClick={() => {
                                      setEditedDesc(originalDesc);
                                      setIsDescEmpty(false);
                                    }}
                                  >
                                    <Icon
                                      icon="ph:x-bold"
                                      width={15}
                                      height={15}
                                    />
                                  </button>
                                  <p>Deskripsi tidak boleh kosong.</p>
                                </div>
                              )}
                              <form className="edit-post-content">
                                <input
                                  type="text"
                                  name="desc"
                                  value={editedDesc}
                                  onChange={(e) =>
                                    setEditedDesc(e.target.value)
                                  }
                                  ref={descInputRef}
                                />
                                <input
                                  type="file"
                                  name="img"
                                  onChange={(e) =>
                                    setEditedImg(e.target.files[0])
                                  }
                                />
                                {post.img && post.desc && (
                                  <div className="add-empty-desc-button">
                                    <button onClick={handleRemoveImg}>
                                      Hapus Gambar
                                    </button>
                                  </div>
                                )}
                                <button
                                  onClick={handleEdit}
                                  disabled={isDescEmpty}
                                >
                                  Post
                                </button>
                              </form>
                            </div>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                ) : null}
                <button
                  className="opsi-post-button"
                  onClick={(e) => {
                    setPostOptionButtonPosition(
                      e.target.getBoundingClientRect()
                    );
                    setpostOptionOpen(!postOptionOpen);
                    setPostEditOpen(false);
                  }}
                >
                  <Icon icon="tabler:dots" width={20} height={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="post-content">
          {post.desc && <p className="post-desc">{editedDesc}</p>}
          {post.img && (
            <div className="post-img-container">
              <button
                className="img-button-post"
                onClick={() => openPopup(`/data/${editedImg || post.img}`)}
              >
                <img className="post-img" src={`/data/${post.img}`} alt="" />
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
                  icon="iconamoon:like-fill"
                  width={25}
                  height={25}
                  color={"black"}
                  onClick={handleLike}
                />
                <h3>{data.length} Likes</h3>
              </>
            ) : (
              <Icon
                className="icon"
                icon="iconamoon:like-light"
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
              icon="majesticons:comment-text-line"
              width={25}
              height={25}
            />
          </div>
          <div className="item">
            <Icon
              className="icon"
              icon="fluent:share-24-regular"
              width={30}
              height={30}
            />
          </div>
        </div>
        {commentOpen && <Commento postid={post.id} />}
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
