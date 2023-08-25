import "./Profile.css";
import { Icon } from "@iconify/react";
import profileimg from "../../assets/profil.jpg";
import banner from "../../assets/banner.jpg";
import avatar1 from "../../assets/friend/friend1.jpg";
import avatar2 from "../../assets/friend/friend2.jpg";
import avatar3 from "../../assets/friend/friend3.jpg";
import avatar4 from "../../assets/friend/friend4.jpg";
import avatar5 from "../../assets/friend/friend5.jpeg";

const Profile = () => {
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
      <div className="profil">
        <div className="profil-container">
          <div className="cover-img">
            <img src={banner} />
          </div>
          <div className="profil-user">
            <div className="profil-info">
              <div className="profilePic">
                <img src={profileimg} />
              </div>
              <div className="profil-bio">
                <h2>Jeou Balaraja</h2>
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
          <div className="post-profil">
            <h1>Post belum jadi </h1>
          </div>
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
    </div>
  );
};

export default Profile;
