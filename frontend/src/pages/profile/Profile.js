import { Icon } from "@iconify/react";
import React, { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";

import "./Profile.css";
import Posts from "../../component/posts/Posts.js";
import Sidebar from "../../component/Leftbar/Leftbar";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";

import avatar1 from "../../assets/friend/friend1.jpg";
import avatar2 from "../../assets/friend/friend2.jpg";
import avatar3 from "../../assets/friend/friend3.jpg";
import avatar4 from "../../assets/friend/friend4.jpg";
import avatar5 from "../../assets/friend/friend5.jpeg";

const Profile = () => {
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [imagePopupOpenbanner, setImagePopupOpenBanner] = useState(false);
  const [imagePopupOpenprofile, setImagePopupOpenProfile] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );
  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followeduserId=" + userId).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );
  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  const friend = [
    {
      id: 1,
      name: "John Doe",
      mutual: "19 Mutual friends",
      avatar: avatar4,
    },
    {
      id: 2,
      name: "Jennifer",
      mutual: "22 Mutual friends",
      avatar: avatar3,
    },
    {
      id: 3,
      name: "Lala",
      mutual: "10 Mutual friends",
      avatar: avatar2,
    },
    {
      id: 4,
      name: "Johnny Doe",
      mutual: "13 Mutual friends",
      avatar: avatar5,
    },
    {
      id: 5,
      name: "John Doel",
      mutual: "90 Mutual friends",
      avatar: avatar1,
    },
  ];
  return (
    <div>
      {isLoading ? (
        "loading"
      ) : (
        <div className="profil">
          <div className="profil-container">
            <div className="cover-img">
              <div className="post-img-banner">
                <button
                  className="img-button"
                  onClick={() => setImagePopupOpenBanner(true)}
                >
                  <img src={data && data.coverpic} alt="banner" />
                </button>
              </div>
            </div>
            {imagePopupOpenbanner && (
              <div className="image-popup-profil">
                <button
                  className="close-button"
                  onClick={() => setImagePopupOpenBanner(false)}
                >
                  <Icon icon="ph:x-bold" color="black" width={40} height={40} />
                </button>
                <img className="popup-img" src={data && data.coverpic} alt="" />
              </div>
            )}
            <div className="profil-user">
              <div className="profil-info">
                <div className="profilePic">
                  <div className="post-img-profile">
                    <button
                      className="img-button-profile"
                      onClick={() => setImagePopupOpenProfile(true)}
                    >
                      <img src={data && data.profilepic} alt="post-profile" />
                    </button>
                  </div>
                </div>
                {imagePopupOpenprofile && (
                  <div className="image-popup-profil">
                    <button
                      className="close-button"
                      onClick={() => setImagePopupOpenProfile(false)}
                    >
                      <Icon
                        icon="ph:x-bold"
                        color="black"
                        width={40}
                        height={40}
                      />
                    </button>
                    <img
                      className="popup-img"
                      src={data && data.profilepic}
                      alt=""
                    />
                  </div>
                )}
                <div className="profil-bio">
                  <h2>{data && data.username}</h2>
                  <h4>300 friends (90 mutual) </h4>
                </div>
              </div>
              <div className="profiluser-button">
                {rIsLoading ? (
                  "Loading"
                ) : userId === currentUser.id ? (
                  <Link to="/Update">
                    <button>Edit Profile</button>
                  </Link>
                ) : (
                  <button className="add-button" onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}

                <button className="message-user-button">
                  <Icon
                    icon="ion:chatbox-ellipses-outline"
                    color="black"
                    width={20}
                    height={20}
                  />
                </button>
                <button className="share-user-button">
                  <Icon
                    icon="basil:share-outline"
                    color="black"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>
            <Posts userId={userId} className="posts-profile" />
          </div>
          <div className="rightProfileBar">
            <div className="search-profile">
              <input
                className="input-profile"
                type="text"
                placeholder="Search on profile"
              />
            </div>
            <div className="intro">
              <h2>Intro</h2>
              <h3>
                <Icon icon="ep:info-filled" width={25} height={25} />
                Joined
                <span>32 Agustus 2032</span>
              </h3>
              <h3>
                <Icon icon="fluent:location-16-filled" width={25} height={25} />
                From
                <span>Sleman, Yogyakarta</span>
              </h3>
              <h4>
                Etiam libero dui, varius tempor malesuada, convallis in tellus.
                Phasellus vel risus a dui facilisis iaculis. Fusce porttitor
                efficitur pharetra. Integer sit amet aliquam turpis.
              </h4>
            </div>
            <div className="friends-rec">
              {friend.map((friend) => (
                <div className="friend-profil" key={friend.id}>
                  <div className="friend-avatar-profil">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="avatar"
                    />
                  </div>
                  <div className="friend-info-profil">
                    <h3>{friend.name}</h3>
                    <h4>{friend.mutual}</h4>
                    <button className="button-add">
                      <Icon
                        icon="ic:baseline-person-add"
                        width={22}
                        height={22}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Sidebar toggleSettings={toggleSettings} toggleLogout={toggleLogout} />
      {settingOpen && (
        <>
          <div className="settings-overlay" />
          <div className="settings-container">
            <Settings onClose={toggleSettings} userdata={data} />
          </div>
        </>
      )}
      {logoutOpen && (
        <>
          <div className="popup-logout-container" />
          <div className="popup-logout">
            <Logout onClose={toggleLogout} />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
