import PropTypes from "prop-types";
import "./Sidebar.css";

const Sidebar = ({ isOpen, previousChats }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <h2>Previous Chats</h2>
      <div className="previous-chats">
        {previousChats.map((chat, index) => (
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
  ).isRequired,
};

export default Sidebar;
