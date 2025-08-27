import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Sidebar.css";

const Sidebar = ({
  isOpen,
  previousChats = [],
  onCreate,
  activeChat,
  onChatSelect,
}) => {
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
          New chat
        </button>
      </div>

      <div className="previous-chats">
        {chats.map((chat, index) => (
          <div
            key={chat._id}
            className={`chat-item ${
              activeChat?._id === chat._id ? "active" : ""
            }`}
            onClick={() => onChatSelect && onChatSelect(chat)}
          >
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
      _id: PropTypes.string,
    })
  ),
  onCreate: PropTypes.func,
  activeChat: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
  }),
  onChatSelect: PropTypes.func,
};

export default Sidebar;
