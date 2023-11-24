import React from "react";
import { makeRequest } from "../../fetch.js";
import Comments from "../comments/Comments.js";
import "../comments/Comments.css";
import { useContext, useState, useRef, useEffect } from "react";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";

import defaultprofile from "../../assets/profile/default_avatar.png";

const Commento = ({ postid, className }) => {
  const { user: currentUser } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState();
  const fileInputRef = useRef(null);
  const [desc, setDesc] = useState(null);
  const [file, setFile] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);

  const upload = async () => {
    try {
      const formData = new FormData();
      const fileName = Date.now() + file.name;
      formData.append("name", fileName);
      formData.append("file", file);
      const res = await makeRequest("upload", "POST", formData);
      return fileName;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const commentsUrl = `comments/${postid}`;
  
      try {
        const res = await makeRequest(commentsUrl);
        setComments(
          res.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        // Handle error
        console.error('Error fetching comments:', error.message);
      }
    };
  
    fetchComments();
  }, [postid]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendUrl = "relationships/friends/" + user._id
        const friendList = await makeRequest(friendUrl);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user._id]);

  useEffect(() => {
    const handleKeyPress = async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        if (!desc && !file) {
          return;
        }

        let imgUrl = "";
        if (file) {
          imgUrl = await upload(file).catch((uploadError) => {
            console.log(uploadError.message);
          });
        }

        try {
          const newComment = {
            desc,
            img: imgUrl,
            postId: postid,
            userId: currentUser._id,
          };
          await makeRequest("comments", "POST", newComment);

          setComments((prevComments) => [...prevComments, newComment]);

          setDesc("");
          setFile(null);
        } catch (error) {
          console.error(error);
          console.log(error.message);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [desc, file, postid, currentUser._id, setComments]);

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

  return (
    <div className={`commento ${className}`}>
      <div className="write">
        <div className="write1">
          <img
            className="comments-pic-write"
            src={
              currentUser && currentUser.profilePicture
                ? PF + currentUser.profilePicture
                : defaultprofile
            }
            alt={currentUser.displayname}
          />
          <input
            className="input-comment"
            type="text"
            id="desc"
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
                <Icon icon="ph:x-bold" width={15} height={15} />
              </button>
            </div>
          )}
        </div>
      </div>
      {comments &&
        comments.map((comment) => (
          <Comments
            comment={comment}
            postid={postid}
            key={comment.id}
            friends={friends}
          />
        ))}
    </div>
  );
};

export default Commento;
