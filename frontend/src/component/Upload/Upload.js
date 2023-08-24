import "./Upload.css";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.js";
import { Icon } from "@iconify/react";

const Upload = () => {
    const { currentUser } =  useContext();

    return (
        <div className="upload">
            <div className="uploadContainer">
                <div className="">
                    <input type="text" placeholder={'Tulis sesuatu ${currentUser.name}?'} />
                </div>
                <div className="">
                    <button className="uploadButton">Posting</button>
                </div>
                <div className="uploadItem">
                    <Icon></Icon>
                    <span>Add Image</span>
                </div>
                <div className="uploadItem">
                    <Icon></Icon>
                    <span>Add File</span>
                </div>
                <div className="uploadItem">
                    <Icon></Icon>
                    <span>Add Image</span>
                </div>
            </div>
        </div>
    )
}

export default Upload;