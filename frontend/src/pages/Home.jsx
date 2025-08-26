import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../theme.css";
import "./Home.css";
import Sidebar from "../components/chat/Sidebar";
import ChatArea from "../components/chat/ChatArea";
import {
  addChat,
  addMessage,
  clearMessages,
  setChats,
  setCurrentChat,
  setMessages,
} from "../redux/features/chatSlice";

import axios from "../api/axios.config";
import { io } from "socket.io-client";

const Home = () => {
  const dispatch = useDispatch();
  const {
    messages,
    chats: previousChats,
    currentChat,
  } = useSelector((state) => state.chat);

  console.log(messages);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [socket, setsocket] = useState(null);

  const handleChatSelect = async (chat) => {
    dispatch(setCurrentChat(chat));
    dispatch(clearMessages());

    try {
      const response = await axios.get(`/api/chat/message/${chat._id}`, {
        withCredentials: true,
      });



      
      const messages = response.data.chats.map((msg) => ({
        content: msg.content,
        sender: msg.sender,
        timestamp: msg.createdAt,
      }));
      console.log(messages);

      // dispatch(setMessages(messages));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    axios.get("/api/chat", { withCredentials: true }).then((response) => {
      dispatch(setChats(response.data.chats));
    });

    const tempSocket = io("http://localhost:3000", { withCredentials: true });

    tempSocket.on("ai-response", (messagePayload) => {
      console.log("received ai response", messagePayload);
      const newMessage = {
        content: messagePayload.content,
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(newMessage));
    });

    setsocket(tempSocket);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const handleSendMessage = async (message) => {
    if (!message.trim() || !currentChat) return;

    // Add user message to chat
    const newMessage = {
      content: message,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage(newMessage));

    socket.emit("ai-message", {
      chat: currentChat._id,
      content: message,
    });
  };

  const handleCreateChat = async () => {
    // Prompt user for chat title
    const title = window.prompt("Enter a title for your new chat:");
    if (!title) return;

    const response = await axios.post(
      "/api/chat",
      { title },
      { withCredentials: true }
    );

    const newChat = {
      id: response.data.chat._id,
      title: response.data.chat.title,
      createdAt: response.data.chat.lastActivity,
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
        activeChat={currentChat}
        onChatSelect={handleChatSelect}
      />

      <ChatArea messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Home;
