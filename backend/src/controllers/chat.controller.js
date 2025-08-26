const chatModel = require("../models/chat.model");
const messageModel = require("../models/message.model");

async function createChat(req, res) {
  const { title } = req.body;
  const user = req.user;

  const chat = await chatModel.create({
    user: user.id,
    title: title,
  });

  res.status(201).json({
    message: "Chat created succesfully",
    chat: {
      _id: chat._id,
      title: chat.title,
      lastActivity: chat.lastActivity,
      user: chat.user,
    },
  });
}

async function getAllChats(req, res) {
  const user = req.user;

  const chats = await chatModel.find({ user: user.id });

  res.status(200).json({
    message: "Chats fetched successfully",
    chats: chats.map((chat) => ({
      _id: chat._id,
      title: chat.title,
      lastActivity: chat.lastActivity,
      user: chat.user,
    })),
  });
}

async function getAllMessages(req, res) {
  const param = req.params;
  console.log(param);

  const chats = await messageModel.find({ chat: param.id });

  res.status(200).json({
    message: "Chats fetched successfully",
    chats,
  });
}

module.exports = { createChat, getAllChats, getAllMessages };
