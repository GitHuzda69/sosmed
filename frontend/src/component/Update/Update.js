import { useContext, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import "./Update.css";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthContext from "../../context/authContext";

const Update = ({ userdata, onClose }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { currnrUser } = useContext(AuthContext);
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: "",
    city: "",
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
    setUpdateOpen(false)
  };
  const coverInputRef = useRef(null);
  const profileInputRef = useRef(null);
  const [selectedCoverFileName, setSelectedCoverFileName] = useState("");
  const [selectedProfileFileName, setSelectedProfileFileName] = useState("");
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);

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
    onClose();
  };

  return (
    <div className="edit">

      <div className="edit-profile-container">
        <div className="edit-profile">
          <h2>Edit Your Profile</h2>
          <form className="edit-content">
            <h4>Edit Cover Image</h4>
            <label htmlFor="coverInput" className="file-label">
              {selectedCoverFileName ? "Choosed" : "Choose File"}
            </label>
            <input
              type="file"
              id="coverInput"
              ref={coverInputRef}
              onChange={handleCoverFileChange}
              style={{ display: "none" }}
            />
            <h4>Edit Profile Image</h4>
            <label htmlFor="profileInput" className="file-label">
              {selectedProfileFileName ? "Choosed" : "Choose File"}
            </label>
            <input
              type="file"
              id="profileInput"
              ref={profileInputRef}
              onChange={handleProfileFileChange}
              style={{ display: "none" }}
            />
            <h4>Edit Your Name</h4>
            <input
              className="input-edit"
              type="text"
              name="username"
              onChange={handleChange}
            />
            <h4>Edit Your City</h4>
            <input
              className="input-edit"
              type="text"
              name="city"
              onChange={handleChange}
            />
          </form>
          <button className="edit-save" onClick={handleSubmit}>
            Save
          </button>
          <button className="edit-close" onClick={handleBackClick}>
            Cancel
          </button>
        </div>
      </div>
      <div className="popup-edit-container">
        {selectedCoverImage && (
          <div className="popup-edit">
            <h2>Cover Image</h2>
            <button onClick={resetInputCover} className="close-popup">
              <Icon icon="ph:x-bold" color="black" width={25} height={25} />
            </button>
            <img
              src={selectedCoverImage}
              alt="Selected Cover Image"
              className="selected-image-edit-cover"
            />
            <span>{selectedCoverFileName}</span>
          </div>
        )}
        {selectedProfileImage && (
          <div className="popup-edit-profile">
            <h2>Profile Image</h2>
            <button onClick={resetInputProfile} className="close-popup">
              <Icon icon="ph:x-bold" color="black" width={25} height={25} />
            </button>
            <img
              src={selectedProfileImage}
              alt="Selected Cover Image"
              className="selected-image-edit-profile"
            />
            <span>{selectedProfileFileName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Update;
