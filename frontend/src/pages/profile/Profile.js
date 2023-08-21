import "./Profile.css";
import profileimg from "../../assets/profil.jpg"

const Profile = () => {
    return (
        <div className="profile">
            <div className="container">
            <div className="cover-img">

            </div>
            <div className="profilePic">
                <img src={profileimg} />
            </div>
            <div className="profileUserInfo">
                <button>Add Friend</button>
            </div>
            </div>
            <div className="post">

            </div>
            <div className="rightProfileBar">

            </div>
        </div>
    )
}

export default Profile