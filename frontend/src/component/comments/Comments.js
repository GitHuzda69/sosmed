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
  const [desc, setDesc] = useState(undefined);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCommentImg, setSelectedCommentImg] = useState(null);
  const [commentOptionOpen, setCommentOptionOpen] = useState({});
  const [commentOptionButtonPosition, setCommentOptionButtonPosition] =
    useState(null);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postid=" + postid).then((res) => {
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

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const handleKeyPress = async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        if (!desc && !file) {
          return;
        }

        let imgUrl = "";
        if (file) {
          imgUrl = await upload();
        }
        mutation.mutate({ desc, img: imgUrl, postid });
        setDesc("");
        setFile(null);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });
  const deleteMutation = useMutation(
    (commentId) => {
      return makeRequest.delete("/comments/comments" + commentId);
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
  const handleMediaButtonClick = () => {
    setShowFileInput(!showFileInput);
    if (!showFileInput && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const clearSelectedFile = () => {
    setFile(null);
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
      <div className="write">
        <div className="write1">
          <img
            className="comments-pic-write"
            src={"/data/" + currentUser.profilepic}
            alt=""
          />
          <input
            className="input-comment"
            type="text"
            placeholder="Write a comment . . . "
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <div className="uploadItem-comment-row">
            <button className="uploadItem-comment">
              <Icon icon="ic:outline-poll" width={25} height={25}></Icon>
            </button>
            <button className="uploadItem-comment">
              <Icon icon="fluent:gif-16-regular" width={25} height={25}></Icon>
            </button>
            <button
              className="uploadItem-comment"
              onClick={handleMediaButtonClick}
            >
              <Icon
                icon="material-symbols:perm-media-outline"
                width={25}
                height={25}
              ></Icon>
            </button>
            <input
              className="uploadItem-popup"
              type="file"
              id="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="write-pic">
          {file && (
            <div className="selected-file-comment">
              <img
                className="selected-image-comment"
                src={URL.createObjectURL(file)}
                alt="Selected"
              />
              <span className="file-name-comment">{file.name}</span>
              <button
                className="clear-file-button-comment"
                onClick={clearSelectedFile}
              >
                <Icon icon="ph:x-bold" color="black" width={15} height={15} />
              </button>
            </div>
          )}
        </div>
      </div>

      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <div className="comment-info">
                <img
                  className="comments-pic"
                  src={"/data/" + comment.profilepic}
                  alt=""
                />
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
                        >
                          <Icon icon="tabler:edit" height={20} width={20} />
                          Edit Comment
                        </button>
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
              <div className="info-comment">
                <div className="item-comment">
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
                    />
                  )}
                </div>
                <div className="item-comment">
                  <Icon
                    className="icon"
                    icon="mdi:share"
                    width={30}
                    height={30}
                  />
                  <h3>Share</h3>
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
          ))}
    </div>
  );
};

export default Comments;
