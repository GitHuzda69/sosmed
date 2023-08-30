import "./Upload.css";
import { useContext, useState, useRef } from "react";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState(null);
  const fileInputRef = useRef(null);
  const [showFileInput, setShowFileInput] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const clearSelectedFile = () => {
    setFile(null);
  };

  const handleMediaButtonClick = () => {
    setShowFileInput(!showFileInput);
    if (!showFileInput && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
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
            <Icon icon="ph:x-bold" color="black" width={15} height={15}/>
            </button>
          </div>
        )}
      </div>
      <div className="input-post">
        <textarea
          type="text"
          placeholder={"Tulis sesuatu ${currentUser.name}?"}
          onChange={(e) => setDesc(e.target.value)}
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
          <button className="uploadItem" onClick={handleMediaButtonClick}>
            <Icon
              icon="material-symbols:perm-media-outline"
              width={25}
              height={25}
            ></Icon>
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
        style={{ display:"none" }}
      />
    </div>
  );
};

export default Upload;
