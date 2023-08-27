import "./Upload.css";
import { useContext, useState } from "react";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleMediaButtonClick = () => {
    setShowFileInput(!showFileInput);
  };

  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <div className="upload">
      <div className="input-post">
        <textarea
          type="text"
          placeholder={`Tuliskan sesuatu ${currentUser.username}`}
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
      {showFileInput && (
        <input
          className="uploadItem-popup"
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      )}
    </div>
  );
};

export default Upload;
