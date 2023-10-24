import "./Upload.css";
import { useContext, useState, useRef } from "react";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { useNavigate } from "react-router";

const Upload = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [showFileInput, setShowFileInput] = useState(false);

  const { user } = useContext(AuthContext);
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const clearSelectedFile = () => {
    setFile(null);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await makeRequest.post("/upload", data);
      } catch (err) {}
    }
    try {
      await makeRequest.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  const handleMediaButtonClick = () => {
    setShowFileInput(!showFileInput);
    if (!showFileInput && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <div className="upload">
      <div className="selected-file-container">
        {file && (
          <div className="selected-file-info">
            <img
              className="selected-image"
              src={URL.createObjectURL(file)}
              alt="Selected"
            />
            <span className="file-name">{file.name}</span>
            <button className="clear-file-button" onClick={clearSelectedFile}>
              <Icon icon="ph:x-bold" color="white" width={15} height={15} />
            </button>
          </div>
        )}
      </div>
      <div className="input-post">
        <textarea
          type="text"
          placeholder={"What's in your mind " + user.username + "?"}
          ref={desc}
          onKeyDown={handleEnterKey}
        />
      </div>
      <div className="button-upload">
        <div className="uploadItem-row">
          <button className="uploadItem">
            <Icon icon="ic:outline-poll" width={25} height={25}></Icon>
          </button>
          <button className="uploadItem">
            <Icon icon="fluent:gif-16-regular" width={25} height={25}></Icon>
          </button>
          <button className="uploadItem" onClick={handleMediaButtonClick} type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}>
            <Icon
              icon="material-symbols:perm-media-outline"
              width={25}
              height={25}
            ></Icon>
          </button>
          <button className="uploadButton" onClick={handleClick}>
            Post
          </button>
        </div>
      </div>
      <input
        className="uploadItem-popup"
        type="file"
        id="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default Upload;
