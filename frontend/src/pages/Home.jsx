import { useState } from "react";
import "../theme.css";
import "./Home.css";
import Sidebar from "../components/chat/Sidebar";
import ChatArea from "../components/chat/ChatArea";

const Home = () => {
  // State variables
  const [messages, setMessages] = useState([]);
  const [previousChats, setPreviousChats] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to chat
    const newMessage = {
      content: message,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);

    try {
      // TODO: Implement AI service call here
      const aiResponse = {
        content: "This is a mock AI response. Replace with actual API call.",
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error getting AI response:", error);
    }
  };

  return (
    <div className="home-container">
      <button
        className="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      <Sidebar isOpen={isSidebarOpen} previousChats={previousChats} />

      <ChatArea messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Home;
