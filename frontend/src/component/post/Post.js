import "./Post.css";
import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import { format } from "timeago.js";
import Commento from "../Commento/Commento.js";
import Rightbar from "../rightbar/Rightbar.js";
import HomeProfile from "../home-profile/home-profile";

import defaultprofile from "../../assets/profile/default_avatar.png";

const Post = ({
  post,
  openPostOption,
  handleOpenPostOption,
  handleClosePostOption,
  friends,
}) => {
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
  const [like, setLike] = useState(post.likes && post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const following = friends
    ? friends.some((friend) => friend._id === post.userId)
    : false;
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  useEffect(() => {
    setIsLiked(post.likes && post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    if (post.userId) {
      const fetchUser = async () => {
        try {
          const res = await makeRequest.get(`/users?userId=${post.userId}`);
          setUser(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchUser();
    }
  }, [post.userId]);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      const fileName = Date.now() + file.name;
      formData.append("name", fileName);
      formData.append("file", file);
      await makeRequest.post("/upload", formData);
      return fileName;
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = () => {
    try {
      makeRequest.put("/posts/" + post._id, { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleDelete = async () => {
    try {
      await makeRequest.delete(`/posts/${post._id}`, {
        data: { userId: currentUser._id },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
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
      const updatedPost = await makeRequest.put("/posts/" + editedPost._id, editedPost);
      setPosts(updatedPost); 
      setPostEditOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleFollow = async () => {
    try {
      let isFollowing = currentUser.followings.includes(user?._id);

      if (isFollowing) {
        await makeRequest.put(`/relationships/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await makeRequest.put(`/relationships/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }

      setFollowed(!isFollowing);
    } catch (err) {
      console.log(err);
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

  const navigate = useNavigate();
  const handleMessage = async () => {
    try {
      await makeRequest.post(`/conversations/`, {
        senderId: currentUser._id,
        receiverId: post._id,
      });
      navigate("/messages");
    } catch (err) {
      console.log(err);
    }
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

      await makeRequest.put(`/posts/${post._id}`, updatedPost);
      setEditedImg(null);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="post-container">
      <div className="post">
        <div className="container">
          <div className="user">
            <div className="userinfo">
              <Link
                to={`/profile/${user.username}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  className="profile"
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : defaultprofile
                  }
                  alt=""
                />
              </Link>
              <div className="details">
                <span className="name">{user.displayname}</span>
                <span className="date">{format(post.createdAt)}</span>
              </div>
              <div className="options">
                {openPostOption === post._id ? (
                  <div className="post-option-popup">
                    {post.userId !== currentUser._id ? (
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
                            marginTop: "2px",
                            gap: "5px",
                          }}
                        >
                          {following ? (
                            <Icon
                              icon="bi:person-check-fill"
                              width={20}
                              height={20}
                            />
                          ) : (
                            <Icon
                              icon="bi:person-plus-fill"
                              width={20}
                              height={20}
                            />
                          )}
                          {following ? "Unfollow" : "Follow"}
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
                                  id="img"
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
                  onClick={() => {
                    if (openPostOption === post._id) {
                      handleClosePostOption();
                    } else {
                      handleOpenPostOption(post._id);
                    }
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
          {post?.desc && <p className="post-desc">{editedDesc}</p>}
          {post.img && (
            <div className="post-img-container">
              <button
                className="img-button-post"
                onClick={() => openPopup(PF + `${editedImg || post.img}`)}
              >
                <img className="post-img" src={PF + `${post.img}`} alt="" />
              </button>
            </div>
          )}
        </div>
        <div className="info">
          <div className="item">
            {isLiked ? (
              <>
                <Icon
                  className="icon"
                  icon="iconamoon:like-fill"
                  width={25}
                  height={25}
                  color={"black"}
                  onClick={handleLike}
                />
                <h3>{like} Likes</h3>
              </>
            ) : (
              <>
                <Icon
                  className="icon"
                  icon="iconamoon:like-light"
                  width={25}
                  height={25}
                  onClick={handleLike}
                />
              </>
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
        {commentOpen && <Commento postid={post._id} />}
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
