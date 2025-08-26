import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Sidebar.css";

const Sidebar = ({ isOpen, previousChats = [], onCreate }) => {
  const [chats, setChats] = useState(previousChats);

  useEffect(() => {
    setChats(previousChats || []);
  }, [previousChats]);

  const handleNewChat = () => {
    const title = `New Chat ${chats.length + 1}`;
    const newChat = { title };
    const updated = [newChat, ...chats];
    setChats(updated);
    if (typeof onCreate === "function") onCreate(newChat, updated);
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <h2>Previous Chats</h2>
      <div className="sidebar-header">
        <button className="new-chat-btn" onClick={handleNewChat}>
          + New chat
        </button>
      </div>

      <div className="previous-chats">
        {chats.map((chat, index) => (
          <div key={index} className="chat-item">
            {chat.title}
          </div>
        ))}
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  previousChats: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ),
  onCreate: PropTypes.func,
};

export default Sidebar;
