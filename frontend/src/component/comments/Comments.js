import "./Comments.css";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import { makeRequest } from "../../fetch.js";
import moment from "moment";

import defaultprofile from "../../assets/profile/default_avatar.png";

const Comments = ({ comment, friends }) => {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const [user, setUser] = useState();
  const [comments, setComments] = useState();
  const [selectedCommentImg, setSelectedCommentImg] = useState(null);
  const [commentEditOpen, setCommentEditOpen] = useState(null);
  const [commentOptionOpen] = useState({});
  const [editedDescComment, setEditedDescComment] = useState(comment.desc);
  const [editedImgComment, setEditedImgComment] = useState(null);
  const [isDescCommentEmpty, setIsDescCommentEmpty] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_APP;

  useEffect(() => {
    if (comment.userId) {
      const fetchUser = async () => {
        const userUrl = `users?userId=${comment.userId}`;
        try {
          const res = await makeRequest(userUrl);
          setUser(res);
        } catch (error) {
          // Handle error
          console.error("Error fetching user:", error.message);
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
      await makeRequest("upload", "POST", formData);
      return fileName;
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const deleteUrl = `comments/${comment._id}`;
      const deleteData = { userId: currentUser._id };
      await makeRequest(deleteUrl, "DELETE", deleteData);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
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
      const updateUrl = `comments/${comment._id}`;
      const updatedComment = await makeRequest(updateUrl, "PUT", editedComment);

      const updatedComments = comments.map((commentItem) => (commentItem.id === updatedComment.id ? updatedComment : commentItem));
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

      await makeRequest(`comments/${comment._id}`, "PUT", updatedComment);
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
        await makeRequest(`relationships/${user._id}/unfollow`, "PUT", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await makeRequest(`relationships/${user._id}/follow`, "PUT", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const following = friends ? friends.some((friend) => friend._id === comment.userId) : false;

  return (
    <div className="comments">
      <div className="comment" key={comment.id}>
        <div className="comment-info">
          <img className="comments-pic" src={user && user.profilePicture ? PF + user.profilePicture : defaultprofile} alt={user.displayname} />
          <span>{user && user.displayname}</span>
          <h3>{moment(comment.createdAt).fromNow()}</h3>
          {commentEditOpen && (
            <div className="edit-comment">
              {isDescCommentEmpty && (
                <div className="edit-comment-warn">
                  <button
                    className="close-warn-comment"
                    onClick={() => {
                      setIsDescCommentEmpty(false);
                    }}
                  >
                    <Icon icon="ph:x-bold" width={15} height={15} />
                  </button>
                  <p>Deskripsi tidak boleh kosong.</p>
                </div>
              )}
              <form className="edit-comment-content">
                <input className="comment-content-text" type="text" name="desc" value={editedDescComment} onChange={(e) => setEditedDescComment(e.target.value)} />
                <input type="file" name="img" onChange={(e) => setEditedImgComment(e.target.files[0])} />
                {comment.img && comment.desc && (
                  <button className="del-img-edit-comment" onClick={handleRemoveImgComment}>
                    Hapus Gambar
                  </button>
                )}
                <button className="save-edit-comment" onClick={handleEditButtonClick} disabled={isDescCommentEmpty}>
                  Save
                </button>
                <button
                  className="close-edit-comment"
                  onClick={(e) => {
                    e.preventDefault();
                    setCommentEditOpen(false);
                    setIsDescCommentEmpty(false);
                  }}
                >
                  Close
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
                    <Icon icon="ion:chatbox-ellipses-outline" width={20} height={20} />
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
                    {following ? <Icon icon="bi:person-check-fill" width={20} height={20} /> : <Icon icon="bi:person-plus-fill" width={20} height={20} />}
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
              <button className="img-button-comments" onClick={() => openPopup(`/data/${editedImgComment || comment.img}`)}>
                <img className="comments-image" src={PF + comment.img} alt="comment-img" />
              </button>
            )}
          </div>
        </div>
        {popupOpen && (
          <div className="popup-overlay-comments" onClick={closePopup}>
            <div className="popup-comments">{selectedCommentImg && <img className="popup-image-comments" src={selectedCommentImg} alt="comment-img" />}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
