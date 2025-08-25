import { useState } from "react";
import PropTypes from "prop-types";
import "./MessageInput.css";

const MessageInput = ({ onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    onSendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type your message..."
        className="message-input"
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
};

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default MessageInput;
