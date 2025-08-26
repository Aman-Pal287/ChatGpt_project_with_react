import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "../theme.css";
import "./Home.css";
import Sidebar from "../components/chat/Sidebar";
import ChatArea from "../components/chat/ChatArea";
import { addChat, addMessage, clearMessages, setChats } from '../redux/features/chatSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { messages, chats: previousChats } = useSelector((state) => state.chat);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to chat
    const newMessage = {
      content: message,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage(newMessage));

    try {
      // TODO: Implement AI service call here
      const aiResponse = {
        content: "This is a mock AI response. Replace with actual API call.",
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(aiResponse));
    } catch (error) {
      console.error("Error getting AI response:", error);
    }
  };

  const handleCreateChat = async () => {
    // Prompt user for chat title
    const title = window.prompt("Enter a title for your new chat:");
    if (!title) return;

    const newChat = {
      id: Date.now().toString(),
      title,
      createdAt: new Date().toISOString(),
    };

    // Add new chat to state
    dispatch(addChat(newChat));
    dispatch(clearMessages());
    
    // ensure sidebar remains open so user sees the new chat
    setIsSidebarOpen(true);
  };

  return (
    <div className="home-container">
      <button
        className="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      <Sidebar
        isOpen={isSidebarOpen}
        previousChats={previousChats}
        onCreate={handleCreateChat}
      />

      <ChatArea messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Home;
