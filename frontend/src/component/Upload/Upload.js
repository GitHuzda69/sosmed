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
            <div className="uploadContainer">
                <div className="">
                    <input type="text" placeholder={'Tulis sesuatu ?'}
                    onChange={(e) => setDesc(e.target.value)} />
                </div>
                <div className="uploadItem">
                    <input type="file" onChange={(e) => setFile(e.target.file[0])} />
                    <label htmlFor="file">
                    <span>Add Image</span>
                    </label>
                </div>
                <div className="uploadItem">
                    <Icon></Icon>
                    <span>Add File</span>
                </div>
                <div className="uploadItem">
                    <Icon></Icon>
                    <span>Add Image</span>
                </div>
                    <button className="uploadButton" onClick={handleClick} >Posting</button>
            </div>
        </div>
    )
}

export default Upload;