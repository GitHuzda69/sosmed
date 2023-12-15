import React, { useState } from "react";
import { format, isToday, isSameDay, isYesterday, isThisYear } from "date-fns";
import "../Chat/Chat.css";
import { Icon } from "@iconify/react";

export default function Chat({ message, own }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={own ? "chat-self" : "chat-other"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3>{message.text}</h3>
      <h4>{format(new Date(message.createdAt), "hh:mm a")}</h4>
      {isHovered && own && (
        <button className="delete-button">
          <Icon icon="mdi:trash" width={20} height={20} />
        </button>
      )}
    </div>
  );
}
