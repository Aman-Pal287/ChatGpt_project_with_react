import PropTypes from "prop-types";
import "./ChatMessage.css";

const ChatMessage = ({ message }) => {
  return (
    <div
      className={`message ${
        message.sender === "user" ? "user-message" : "ai-message"
      }`}
    >
      <div className="message-content">{message.content}</div>
      <div className="message-timestamp">
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    sender: PropTypes.oneOf(["user", "ai"]).isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChatMessage;
