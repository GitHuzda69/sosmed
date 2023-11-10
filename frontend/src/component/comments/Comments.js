import "./Comments.css";
import { useContext, useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import {format} from "timeago.js";

import defaultprofile from "../../assets/profile/default_avatar.png";

const Comments = ({ postid, comment }) => {
  const { user: currentUser } = useContext(AuthContext);
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
  const [commentOptionButtonPosition, setCommentOptionButtonPosition] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

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
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await makeRequest.delete("/comments/" + comment._id, { data: { userId: currentUser._id } });
      if (comments) {
        const updatedComments = comments.filter(commentItem => commentItem._id !== comment._id);
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
    e.preventDefault();
  
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
      const updatedComment = await makeRequest.put("/comments/" + editedComment._id, editedComment);
  
      const updatedComments = comments.map(commentItem =>
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
          <button
            className="button-comment-desc"
            onClick={() => {
              toggleCommentOptions(comment._id);
              setCommentEditOpen(false);
            }}
          >
            <Icon icon="tabler:dots" width={20} height={20} />
          </button>
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
                          type="text"
                          name="desc"
                          value={editedDescComment}
                          onChange={(e) => setEditedDescComment(e.target.value)}
                        />
                        <input
                          type="file"
                          name="img"
                          onChange={(e) =>
                            setEditedImgComment(e.target.files[0])
                          }
                        />
                        {comment.img && comment.desc && (
                          <div className="add-empty-desc-button">
                            <button onClick={handleRemoveImgComment}>
                              Hapus Gambar
                            </button>
                          </div>
                        )}
                        <button
                          onClick={handleEdit}
                          disabled={isDescCommentEmpty}
                        >
                          Post
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : null}
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
