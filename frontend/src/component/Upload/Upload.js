import "./Upload.css";
import { useContext, useState, useRef } from "react";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../fetch.js";
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
  
    const isTextareaEmpty = !desc.current.value.trim();
    const isFileNotSelected = !file;
  
    if (isTextareaEmpty && isFileNotSelected) {
      return;
    }
  
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
  
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      newPost.img = fileName;
  
      try {
        await makeRequest('upload', 'POST', data);
        console.log(data);
      } catch (err) {
        // Handle error
        console.error('Error uploading file:', err.message);
      }
    }
  
    try {
      await makeRequest('posts', 'POST', newPost);
    } catch (err) {
      // Handle error
      console.error('Error creating post:', err.message);
    }
  };
  

  const handleMediaButtonClick = () => {
    setShowFileInput(!showFileInput);
    if (!showFileInput && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleClick(e);
    } else if (e.key === 'Enter' && e.shiftKey) {
      const descElement = desc.current;
      const startPos = descElement.selectionStart;
      const endPos = descElement.selectionEnd;
      const text = descElement.value;
      const newText =
        text.substring(0, startPos) +
        '\n' +
        text.substring(endPos, text.length);
  
      descElement.value = newText;
      descElement.setSelectionRange(startPos + 1, startPos + 1);
    }
  
    handleAutoHeight();
  };

  const handleAutoHeight = () => {
    const textarea = desc.current;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 80)}px`;
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
            <Icon
              icon="fluent:emoji-laugh-24-regular"
              width={25}
              height={25}
            ></Icon>
          </button>
          <button
            className="uploadItem"
            onClick={handleMediaButtonClick}
            type="file"
            id="file"
            accept=".png, .jpeg, .jpg"
            onChange={(e) => setFile(e.target.files[0])}
          >
            <Icon
              icon="material-symbols:perm-media-outline"
              width={25}
              height={25}
            ></Icon>
          </button>
          <button className="uploadItem">
            <Icon icon="fluent:gif-16-regular" width={25} height={25}></Icon>
          </button>
          <button className="uploadItem">
            <Icon icon="ic:outline-poll" width={25} height={25}></Icon>
          </button>
        </div>
        <button className="uploadButton" onClick={handleClick}>
          Post
        </button>
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
