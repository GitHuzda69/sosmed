import "./Upload.css";
import { useContext, useState, useRef } from "react";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { useNavigate } from "react-router";

const Upload = () => {
  
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState(undefined);
  const fileInputRef = useRef(null);
  const [showFileInput, setShowFileInput] = useState(false);

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

  const { currentUser } = useContext(AuthContext);
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const clearSelectedFile = () => {
    setFile(null);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleMediaButtonClick = () => {
    setShowFileInput(!showFileInput);
    if (!showFileInput && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    if (!desc && !file) {
      return;
    }
  
    let imgUrl = "";
    if (file) {
      imgUrl = await upload();
    }
  
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
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
              <Icon icon="ph:x-bold" color="black" width={15} height={15} />
            </button>
          </div>
        )}

      </div>
      <div className="input-post">
        <textarea
          type="text"
          placeholder={`Tuliskan sesuatu ${currentUser.displayname}`}
          onChange={(e) => setDesc(e.target.value)}
          onKeyDown={handleEnterKey}
          value={desc}
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
        style={{ display: "none" }}

      />
    </div>
  );
};

export default Upload;
