import "./Profile.css";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import profileimg from "../../assets/profil.jpg";
import banner from "../../assets/banner.jpg";
import avatar1 from "../../assets/friend/friend1.jpg";
import avatar2 from "../../assets/friend/friend2.jpg";
import avatar3 from "../../assets/friend/friend3.jpg";
import avatar4 from "../../assets/friend/friend4.jpg";
import avatar5 from "../../assets/friend/friend5.jpeg";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [imagePopupOpenbanner, setImagePopupOpenBanner] = useState(false);
  const [imagePopupOpenprofile, setImagePopupOpenProfile] = useState(false);

  const userId = useLocation().pathname.split("/")[2]

  const { isLoading, error, data} = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );
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

  const posts = [
    {
      id: 1,
      name: "Jeou",
      date: "12 hours ago",
      userId: 1,
      profilePic: profileimg,
      pinned: 1,
      img: "",
      desc: "Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd ",
    },
    {
      id: 2,
      name: "Bukan",
      date: "2 days ago",
      userId: 2,
      profilePic: profileimg,
      pinned: 0,
      desc: "Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd asdkas a;askjhnd oiasdoiasoa isasdoi asoidh asoidihasoid ",
      img: "",
    },
    {
      id: 3,
      name: "Orang",
      date: "4 days ago",
      userId: 3,
      profilePic: profileimg,
      pinned: 0,
      desc: "Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd asdkas a;askjhnd oiasdoiasoa isasdoi asoidh asoidihasoid ",
      img: avatar2,
    },
  ];

  return (
    <div>
      <div className="profil"> 
        <div className="profil-container">
          <div className="cover-img">
            <div className="post-img-banner">
              <button
                className="img-button"
                onClick={() => setImagePopupOpenBanner(true)}
              >
                <img src={data.coverpic} alt="banner" />
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
              <img className="popup-img" src={data.coverpic} alt="" />
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
                    <img src={data.profilepic} alt="post-profile" />
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
                  <img className="popup-img" src={data.profilepic} alt="" />
                </div>
              )}
              <div className="profil-bio">
                <h2>{data.username}</h2>
                <h4>300 friends (90 mutual) </h4>
              </div>
            </div>
            <div className="profiluser-button">
              <button className="add-button">
                <Icon
                  icon="ic:sharp-person-add"
                  color="black"
                  width={20}
                  height={20}
                />
                <span>Add friend</span>
              </button>
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
          {posts.map((posts) => (
            <div className="post-profil">
              <div className="post-avatar-profil">
                <img
                  src={posts.profilePic}
                  alt={posts.name}
                  className="avatar-post"
                />
                <div className="post-profil-info">
                  <h2>{posts.name}</h2>
                  <h3>{posts.date}</h3>
                </div>
                {posts.pinned === 1 ? (
                  <>
                    <button className="button-post-profil-pinned">
                      <Icon icon="tabler:dots" width={22} height={22} />
                    </button>
                    <div className="pinned-post">
                      <Icon icon="typcn:pin" width={25} height={25} />
                      <h5>Pinned post</h5>
                    </div>
                  </>
                ) : (
                  <button className="button-post-profil">
                    <Icon icon="tabler:dots" width={22} height={22} />
                  </button>
                )}
              </div>
              <div className="posts-profil-content">
                <h4>{posts.desc}</h4>
                {/* css e ini sama bawah e sebagian ada di post */}
                {posts.img && (
                  <div className="post-img-container">
                    <button
                      className="img-button"
                      onClick={() => setImagePopupOpen(true)}
                    >
                      <img
                        className="posts-profil-img"
                        src={posts.img}
                        alt="posts-img"
                      />
                    </button>
                  </div>
                )}
                {imagePopupOpen && (
                  <div className="image-popup-profil">
                    <button
                      className="close-button"
                      onClick={() => setImagePopupOpen(false)}
                    >
                      <Icon
                        icon="ph:x-bold"
                        color="black"
                        width={40}
                        height={40}
                      />
                    </button>
                    <img className="popup-img" src={posts.img} alt="" />
                  </div>
                )}
              </div>
              <div className="button-posts-profil">
                <div className="button-posts">
                  <Icon
                    className="icon"
                    icon="mdi:heart-outline"
                    width={20}
                    height={20}
                    color={"black"}
                  />

                  <h3>12 Likes</h3>
                </div>
                <div className="button-posts">
                  <Icon
                    className="icon"
                    icon="ant-design:message-filled"
                    width={20}
                    height={20}
                  />
                  <h3>12 Comments</h3>
                </div>
                <div className="button-posts">
                  <Icon
                    className="icon"
                    icon="mdi:share"
                    width={20}
                    height={20}
                  />
                  <h3>449 Share</h3>
                </div>
              </div>
            </div>
          ))}
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
                  <button className="button-add" >
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
    </div>
  );
};

export default Profile;
