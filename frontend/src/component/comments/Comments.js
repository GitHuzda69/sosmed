import "./Comments.css";
import { useContext, useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postid, comment }) => {
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCommentImg, setSelectedCommentImg] = useState(null);
  const [img, setImg] = useState(null);
  const [texts, setTexts] = useState({desc: comment.desc})
  const [commentEditOpen, setCommentEditOpen] = useState(null);
  const [commentOptionOpen, setCommentOptionOpen] = useState({});
  const [commentOptionButtonPosition, setCommentOptionButtonPosition] = useState(null);

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followeduserid=" + userId).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();
  const CommentID = comment.id
  const deleteMutation = useMutation(
    (CommentID) => {
      return makeRequest.delete("/comments/" + CommentID);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
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
  const editMutation = useMutation(
    (comment) => {
     return makeRequest.put("/comments/" + comment.id, comment.id);
    },{
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      }
    }
  )

  const handleFollow = () => {
    followMutation.mutate(relationshipData.includes(currentUser.id));
  };

  const handleDelete = () => {
    deleteMutation.mutate(comment.id);
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
    let imgUrl;

    imgUrl = img ? await upload(img) : comment.img;

    editMutation.mutate({ ...texts, img: imgUrl });
    setCommentEditOpen(false);
  };

  const openPopup = (imgUrl) => {
    setSelectedCommentImg(imgUrl);
    setPopupOpen(true);
  };
  const closePopup = () => {
    setSelectedCommentImg(null);
    setPopupOpen(false);
  };
  return (
    <div className="comments">
      <div className="comment" key={comment.id}>
        <div className="comment-info">
          <img
            className="comments-pic"
            src={"/data/" + comment.profilepic}
            alt="" />
          <span>{comment.displayname}</span>
          <h3>{moment(comment.createdat).fromNow()}</h3>
          <button
            className="button-comment-desc"
            onClick={() => toggleCommentOptions(comment.id)}
          >
            <Icon icon="tabler:dots" width={20} height={20} />
          </button>
          {commentOptionOpen[comment.id] ? (
            <div>
              {comment.userid !== currentUser.id ? (
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
                      setCommentEditOpen(!commentEditOpen)
                    }}
                    >
                    <Icon icon="tabler:edit" height={20} width={20} />
                    Edit Comment
                  </button>
                  {commentEditOpen && (
                        <div className="edit-comment">
                          <form className="edit-post-content">
                            <input
                              type="text"
                              name="desc"
                              value={comment.desc}
                              onChange={(e) => setTexts(e.target.value)}
                            />
                            <input
                              type="file"
                              name="img"
                              onChange={(e) => setImg(e.target.files[0])}
                            />
                            <button onClick={handleEdit}>
                              Save
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
          {comment.desc && <h4>{comment.desc}</h4>}
          <div className="img-comments-container">
            {comment.img && (
              <button
                className="img-button-comments"
                onClick={() => openPopup(`/data/${comment.img}`)}
              >
                <img
                  className="comments-image"
                  src={"/data/" + comment.img}
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
