import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import './Messages.css';

const messages = [
  {
    sender: 'John Doe',
    content: 'Hello there!',
    timestamp: '2023-08-05 12:30',
  },
  {
    sender: 'Jane Smith',
    content: 'Hi John! How are you?',
    timestamp: '2023-08-05 12:35',
  },
  // Add more messages here
];

function Messages() {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <div>
        <button>
          <Link
            to="/home"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              icon="mingcute:back-2-fill"
              width={29}
              height={29}
              color="black"
            />
          </Link>
        </button>
      </div>
      <div className="messages-container">
              <h1>Messages</h1>
              <div className="message-list">
                {messages.map((message, index) => (
                  <div className="message" key={index}>
                    <div className="message-sender">{message.sender}</div>
                    <div className="message-content">{message.content}</div>
                    <div className="message-timestamp">{message.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
    </div>
  );
}

export default Messages;
