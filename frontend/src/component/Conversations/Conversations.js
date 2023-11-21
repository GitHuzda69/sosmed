import { useEffect, useState } from "react";
import "./Conversation.css";
import { Icon } from "@iconify/react";

import { makeRequest } from "../../axios";
import defaultprofile from "../../assets/profile/default_avatar.png";


export default function Conversation({conversation, currentUser}) {
    const [user, setUser] = useState();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id)

        const getUser = async () => {
            try{
                const res = await makeRequest("/users?userId=" + friendId)
                setUser(res.data)
            }catch (err) {
                console.log(err)
            }
        };
        getUser();
    }, [currentUser, conversation])

    return (
        <div className="message-friend-container">
        <div className="message-friend-bar">
           <button className="message-friend">
                  <img
                    className="message-friend-avatar"
                    src={
                      user && user.profilePicture
                        ? PF + user.profilePicture
                        : defaultprofile
                    }
                  />
                  <div className="message-friend-bio">
                    <h2>{user && user.displayname}</h2>
                    <h3>{user && user.desc}</h3>
                  </div>
                </button>
        </div>
      </div>
    )
}