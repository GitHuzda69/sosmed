import "./Comments.css";
import { useContext, useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { format } from "timeago.js";

import defaultprofile from "../../assets/profile/default_avatar.png";

const Comments = ({ postid, comment, friends }) => {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [user, setUser] = useState();
  const [comments, setComments] = useState();
  const [selectedCommentImg, setSelectedCommentImg] = useState(null);
  const [img, setImg] = useState(null);
  const [texts, setTexts] = useState({ desc: comment.desc });
  const [commentEditOpen, setCommentEditOpen] = useState(null);
  const [commentOptionOpen, setCommentOptionOpen] = useState({});
  const [editedDescComment, setEditedDescComment] = useState(comment.desc);
  const [editedImgComment, setEditedImgComment] = useState(null);
  const [isDescCommentEmpty, setIsDescCommentEmpty] = useState(false);
  const [originalDescComment, setOriginalDescComment] = useState(comment.desc);
  const [commentOptionButtonPosition, setCommentOptionButtonPosition] =
    useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  useEffect(() => {
    if (comment.userId) {
      const fetchUser = async () => {
        try {
          const res = await makeRequest.get(`/users?userId=${comment.userId}`);
          setUser(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchUser();
    }
  }, [comment.userId]);

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

  const handleDelete = async () => {
    try {
      await makeRequest.delete("/comments/" + comment._id, {
        data: { userId: currentUser._id },
      });
      if (comments) {
        const updatedComments = comments.filter(
          (commentItem) => commentItem._id !== comment._id
        );
        setComments(updatedComments);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleCommentOptions = (commentId) => {
    setCommentOptionButtonPosition(commentId);
    setCommentOptionOpen((prevOptions) => ({
      ...prevOptions,
      [commentId]: !prevOptions[commentId],
    }));
  };

  const handleEdit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!comment.img && editedDescComment.trim() === "") {
      setIsDescCommentEmpty(true);
      return;
    }

    const editedComment = {
      ...comment,
      desc: editedDescComment,
      img: editedImgComment ? await upload(editedImgComment) : comment.img,
    };

    try {
      const updatedComment = await makeRequest.put(
        "/comments/" + comment._id,
        editedComment
      );

      const updatedComments = comments.map((commentItem) =>
        commentItem.id === updatedComment.id ? updatedComment : commentItem
      );
      setCommentEditOpen(false);
      setComments(updatedComments);
    } catch (error) {
      console.error(error);
    }
  };

  const openPopup = (imgUrl) => {
    setSelectedCommentImg(imgUrl);
    setPopupOpen(true);
  };
  const closePopup = () => {
    setSelectedCommentImg(null);
    setPopupOpen(false);
  };

  const handleRemoveImgComment = async () => {
    try {
      const updatedComment = {
        ...comment,
        img: null,
      };

      await makeRequest.put(`/comments/${comment._id}`, updatedComment);
      setEditedImgComment(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditButtonClick = () => {
    setCommentEditOpen(!commentEditOpen);
    handleEdit();
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

  const following = friends
    ? friends.some((friend) => friend._id === comment.userId)
    : false;

  return (
    <div className="comments">
      <div className="comment" key={comment.id}>
        <div className="comment-info">
          <img
            className="comments-pic"
            src={
              user && user.profilePicture
                ? PF + user.profilePicture
                : defaultprofile
            }
          />
          <span>{user && user.displayname}</span>
          <h3>{format(comment.createdAt)}</h3>
          {commentEditOpen && (
            <div className="edit-comment">
              {isDescCommentEmpty && (
                <div className="edit-comment-warn">
                  <button
                    className="close-warn-comment"
                    onClick={() => {
                      setEditedDescComment(originalDescComment);
                      setIsDescCommentEmpty(false);
                    }}
                  >
                    <Icon icon="ph:x-bold" width={15} height={15} />
                  </button>
                  <p>Deskripsi tidak boleh kosong.</p>
                </div>
              )}
              <form className="edit-comment-content">
                <input
                  className="comment-content-text"
                  type="text"
                  name="desc"
                  value={editedDescComment}
                  onChange={(e) => setEditedDescComment(e.target.value)}
                />
                <input
                  type="file"
                  name="img"
                  onChange={(e) => setEditedImgComment(e.target.files[0])}
                />
                {comment.img && comment.desc && (
                  <div className="add-empty-desc-button">
                    <button onClick={handleRemoveImgComment}>
                      Hapus Gambar
                    </button>
                  </div>
                )}
                <button
                  onClick={handleEditButtonClick}
                  disabled={isDescCommentEmpty}
                >
                  Save
                </button>
              </form>
            </div>
          )}
          {commentOptionOpen[comment._id] ? (
            <div>
              {comment.userId !== currentUser._id ? (
                <div className="post-option-popup-other-comment">
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
                      marginTop: "-4px",
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
                      <Icon icon="bi:person-plus-fill" width={20} height={20} />
                    )}
                    {following ? "Unfollow" : "Follow"}
                  </button>
                </div>
              ) : (
                <div className="post-option-popup-self-comment">
                  <button
                    style={{
                      color: "red",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "2px",
                    }}
                    onClick={handleDelete}
                  >
                    <Icon icon="mdi:delete" height={20} width={20} />
                    Delete This Comment
                  </button>
                  <button
                    style={{
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "-3px",
                      gap: "5px",
                    }}
                    onClick={() => {
                      setCommentEditOpen(!commentEditOpen);
                    }}
                  >
                    <Icon icon="tabler:edit" height={20} width={20} />
                    Edit Comment
                  </button>
                </div>
              )}
            </div>
          ) : null}
          <button
            className="button-comment-desc"
            onClick={() => {
              toggleCommentOptions(comment._id);
              setCommentEditOpen(false);
            }}
          >
            <Icon icon="tabler:dots" width={20} height={20} />
          </button>
        </div>
        <div className="comments-content">
          {comment.desc && <h4>{editedDescComment}</h4>}
          <div className="img-comments-container">
            {comment.img && (
              <button
                className="img-button-comments"
                onClick={() =>
                  openPopup(`/data/${editedImgComment || comment.img}`)
                }
              >
                <img
                  className="comments-image"
                  src={PF + comment.img}
                  alt="comment-img"
                />
              </button>
            )}
          </div>
        </div>
        {popupOpen && (
          <div className="popup-overlay-comments" onClick={closePopup}>
            <div className="popup-comments">
              {selectedCommentImg && (
                <img
                  className="popup-image-comments"
                  src={selectedCommentImg}
                  alt="comment-img"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
