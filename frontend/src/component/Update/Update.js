import { useContext, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import "./Update.css";
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AuthContext from "../../context/authContext";
import { useLocation, Link } from "react-router-dom";

import defaultprofile from "../../assets/profile/default_avatar.png";
import defaultcover from "../../assets/profile/default_banner.jpg";

const Update = ({ user, onClose }) => {
  const { currentUser } = useContext(AuthContext);
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    displayname: user.displayname,
    city: user.city,
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;

    coverUrl = cover ? await upload(cover) : user.coverpic;
    profileUrl = profile ? await upload(profile) : user.profilepic;

    mutation.mutate({ ...texts, coverpic: coverUrl, profilepic: profileUrl });
    onClose();
  };
  const coverInputRef = useRef(null);
  const profileInputRef = useRef(null);
  const [selectedCoverFileName, setSelectedCoverFileName] = useState("");
  const [selectedProfileFileName, setSelectedProfileFileName] = useState("");
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const userId = parseInt(useLocation().pathname.split("/")[2]);

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

  const resetProfileImage = () => {
    setProfile(null);
    setSelectedProfileFileName("");
    setSelectedProfileImage(null);
  };

  const resetCoverImage = () => {
    setCover(null);
    setSelectedCoverFileName("");
    setSelectedCoverImage(null);
  };

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

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
              <Icon icon="ph:x-bold" color="black" width={30} height={30} />
            </button>
            <div className="edit-image">
              <div className="edit-image-profile">
                <img
                  src={
                    selectedProfileImage ||
                    (data.profilepic
                      ? `/data/${data.profilepic}`
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
                    (data.coverpic ? `/data/${data.coverpic}` : defaultcover)
                  }
                  alt="Selected Cover Image"
                  className="selected-image-edit-cover"
                />
                <div className="button-cover">
                  <label htmlFor="coverInput" className="file-label">
                    <Icon
                      icon="material-symbols:add-a-photo-outline"
                      color="black"
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
            <div className="edit-bio">
              <div className="edit-name">
                <h4>Name</h4>
                <input
                  className="input-edit-name"
                  type="text"
                  name="displayname"
                  placeholder="Your Name"
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
                  placeholder="Your Location"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="edit-desc">
              <h4>Edit Your desc</h4>
              <textarea className="input-edit-desc" type="text" name="city" />
            </div>
          </form>
          <button className="edit-save" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
      <div className="popup-edit-container"></div>
    </div>
  );
};

export default Update;
