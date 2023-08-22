import "./Upload.css";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.js";

const Upload = () => {
    const { currentUser } =  useContext();

    return (
        <div className="upload">
            <div className="uploadContainer">
                <div className="">
                    <inmg src="" />
                    <input type="text" placeholder={'Tulis sesuatu ${currentUser.name}?'} />
                    <button className="uploadButton">Posting</button>
                </div>
            </div>
        </div>
    )
}

export default Upload;