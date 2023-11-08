import { useContext, useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./Update.css";
import { makeRequest } from "../../axios";
import AuthContext from "../../context/authContext";
import { useLocation, Link } from "react-router-dom";

import defaultprofile from "../../assets/profile/default_avatar.png";
import defaultcover from "../../assets/profile/default_banner.jpg";

const Update = ({ user, onClose }) => {
  const [coverInput, setCover] = useState(null);
  const [profileInput, setProfile] = useState(null);
  const coverInputRef = useRef(null);
  const profileInputRef = useRef(null);
  const desc = useRef();
  const city = useRef();
  const [selectedCoverFileName, setSelectedCoverFileName] = useState("");
  const [selectedProfileFileName, setSelectedProfileFileName] = useState("");
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const { user: currentUser } = useContext(AuthContext);
  const [texts, setTexts] = useState({
    displayname: user.displayname,
    city: user.city,
    desc: user.desc,
  });
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setTexts((prev) => ({
      ...prev,
      displayname: user.displayname,
      city: user.city,
      desc: user.desc,
    }));
  }, [user]);

  const [editedName, setEditedName] = useState(currentUser.displayname);
  const [originalName, setOriginalName] = useState(currentUser.displayname);
  const [isNameEmpty, setIsNameEmpty] = useState(false);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      const fileName = Date.now() + file.name;
      formData.append("name", fileName);
      formData.append("file", file);
      await makeRequest.post("/upload", formData);
      return fileName;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (texts.displayname.trim() === "") {
      setIsNameEmpty(true);
      return;
    }
    try {
      let coverUrl = user.coverPicture;
      let profileUrl = user.profilePicture;

      if (coverInput) {
        coverUrl = await upload(coverInput);
      }

      if (profileInput) {
        profileUrl = await upload(profileInput);
      }
      const editUser = {
        ...texts,
        coverPicture: coverUrl,
        profilePicture: profileUrl,
        userId: user._id,
      };
      try {
        await makeRequest.put("/users/" + user._id, editUser);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error(err);
    }

    onClose();
  };

  const handleCoverFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setCover(selectedFile);
    setSelectedCoverFileName(selectedFile ? selectedFile.name : "");
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedCoverImage(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setSelectedCoverImage(null);
    }
  };

  const handleProfileFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setProfile(selectedFile);
    setSelectedProfileFileName(selectedFile ? selectedFile.name : "");
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedProfileImage(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setSelectedProfileImage(null);
    }
  };

  const resetInputCover = () => {
    setCover(null);
    setSelectedCoverFileName("");
    setSelectedCoverImage(null);
  };
  const resetInputProfile = () => {
    setProfile(null);
    setSelectedProfileFileName("");
    setSelectedProfileImage(null);
  };

  const handleBackClick = () => {
    resetInputCover();
    resetInputProfile();
  };

  const resetName = () => {
    setTexts((prev) => ({ ...prev, displayname: originalName }));
    setEditedName(originalName);
    setIsNameEmpty(false);
  };

  return (
    <div className="edit">
      <button className="clear-image-edit" onClick={handleBackClick}>
        <Icon icon="mingcute:delete-line" height={25} width={25} color="red" />
      </button>
      <div className="edit-profile-container">
        <div className="edit-profile">
          <h2>Edit Profile</h2>
          <form className="edit-content">
            <button className="edit-close" onClick={handleBackClick}>
              <Icon icon="ph:x-bold" width={30} height={30} />
            </button>
            <div className="edit-image">
              <div className="edit-image-profile">
                <img
                  src={
                    selectedProfileImage ||
                    (user.profilePicture
                      ? PF + user.profilePicture
                      : defaultprofile)
                  }
                  alt="Selected Profile Image"
                  className="selected-image-edit-profile"
                />
                <div className="button-profile">
                  <label htmlFor="profileInput" className="file-label">
                    <Icon
                      icon="material-symbols:add-a-photo-outline"
                      width={25}
                      height={25}
                    />
                  </label>
                </div>
                <input
                  type="file"
                  id="profileInput"
                  ref={profileInputRef}
                  onChange={handleProfileFileChange}
                  style={{ display: "none" }}
                />
              </div>
              <div className="edit-image-cover">
                <img
                  src={
                    selectedCoverImage ||
                    (user.coverPicture ? PF + user.coverPicture : defaultcover)
                  }
                  alt="Selected Cover Image"
                  className="selected-image-edit-cover"
                />
                <div className="button-cover">
                  <label htmlFor="coverInput" className="file-label">
                    <Icon
                      icon="material-symbols:add-a-photo-outline"
                      width={25}
                      height={25}
                    />
                  </label>
                </div>
                <input
                  type="file"
                  id="coverInput"
                  ref={coverInputRef}
                  onChange={handleCoverFileChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="edit-profile-popup">
              <div className="edit-name">
                <h4>Name</h4>
                <input
                  className="input-edit-name"
                  type="text"
                  name="displayname"
                  value={texts.displayname}
                  onChange={handleChange}
                />
              </div>
              <div className="edit-city">
                <h4>City</h4>
                <Icon
                  icon="fluent:location-16-filled"
                  height={25}
                  width={25}
                  className="city-icon"
                />
                <input
                  className="input-edit-city"
                  type="text"
                  name="city"
                  value={texts.city}
                  onChange={handleChange}
                  ref={city}
                />
              </div>
            </div>
            <div className="edit-bio">
              <h4>Edit Your Bio</h4>
              <textarea
                className="input-edit-bio"
                type="text"
                name="desc"
                value={texts.desc}
                onChange={handleChange}
                ref={desc}
              />
            </div>
          </form>
          <button
            className="edit-save"
            onClick={handleSubmit}
            disabled={isNameEmpty}
          >
            Save
          </button>
        </div>
        {isNameEmpty && (
          <div className="edit-profile-warn">
            <button
              className="close-warn-profile"
              onClick={() => {
                resetName();
              }}
            >
              <Icon icon="ph:x-bold" width={20} height={20} />
            </button>
            <p>Name cannot be empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Update;
