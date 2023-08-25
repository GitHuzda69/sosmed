import "./Upload.css";
import { useContext, useState } from "react";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";

const Upload = () => {

    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState(null);

    const { currentUser } =  useContext(AuthContext);

    const handleClick = e => {
        e.preventDefault()
    }
  return (
    <div className="upload">
      <div className="input-post">
        <textarea
          type="text"
          placeholder={"Tulis sesuatu ${currentUser.name}?"}
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
          <button className="uploadItem">
            <Icon
              icon="material-symbols:perm-media-outline"
              width={25}
              height={25}
            ></Icon>
          </button>
         </div>
             <button className="uploadButton" onClick={handleClick} >Posting</button>
            </div>
        </div>
        <button className="uploadButton">Post</button>
      </div>
    </div>
  );
};

export default Upload;
