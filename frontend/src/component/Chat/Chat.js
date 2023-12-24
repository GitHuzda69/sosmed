import React, { useContext, useState } from "react";
import { format, isToday, isSameDay, isYesterday, isThisYear } from "date-fns";
import "../Chat/Chat.css";
import { Icon } from "@iconify/react";
import AuthContext from "../../context/authContext";
import { makeRequest } from "../../fetch";

export default function Chat({ message, own, isShowRightBar }) {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useContext(AuthContext);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDelete = async () => {
    try {
      const deleteEndpoint = `messages/${message._id}`;
      await makeRequest(deleteEndpoint, `DELETE`, { userId: user._id });
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isShowRightBar ? (
        <div className={own ? "chat-self" : "chat-other"} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <h3>{message.text}</h3>
          <h4>{format(new Date(message.createdAt), "hh:mm a")}</h4>
          {isHovered && own && (
            <button className="delete-button" onClick={handleDelete}>
              <Icon icon="mdi:trash" width={20} height={20} />
            </button>
          )}
        </div>
      ) : (
        <div className={own ? "chat-self-norightbar" : "chat-other-norightbar"} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <h3>{message.text}</h3>
          <h4>{format(new Date(message.createdAt), "hh:mm a")}</h4>
          {isHovered && own && (
            <button className="delete-button" onClick={handleDelete}>
              <Icon icon="mdi:trash" width={20} height={20} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
