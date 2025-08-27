import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import "./ChatArea.css";

const ChatArea = ({ messages, onSendMessage }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="chat-area">
      <div className="chat-container" ref={chatContainerRef}>
        {messages.length === 0 ? (
          <div className="no-messages">No messages yet</div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))
        )}
      </div>
      <MessageInput onSendMessage={onSendMessage} />
    </main>
  );
};

ChatArea.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      sender: PropTypes.oneOf(["user", "ai"]).isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSendMessage: PropTypes.func.isRequired,
};

export default ChatArea;
