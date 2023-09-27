import React from "react";
import { makeRequest } from "../../axios";
import Comments from "../comments/Comments.js";
import "../comments/Comments.css";
import { useContext, useState, useRef, useEffect } from "react";
import AuthContext from "../../context/authContext.js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Icon } from "@iconify/react";

import defaultprofile from "../../assets/profile/default_avatar.png";

const Commento = ({ postid, className }) => {
  const { currentUser } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [desc, setDesc] = useState(undefined);
  const [file, setFile] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postid=" + postid).then((res) => {
      return res.data;
    })
  );
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
              currentUser && currentUser.profilepic
                ? "/data/" + currentUser.profilepic
                : defaultprofile
            }
            alt={currentUser.displayname}
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
            <Comments comment={comment} postid={postid} key={comment.id} />
          ))}
    </div>
  );
};

export default Commento;
