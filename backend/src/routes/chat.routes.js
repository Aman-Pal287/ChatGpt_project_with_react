const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const chatController = require("../controllers/chat.controller");
/* Post /api/chat/ */
router.post("/", authMiddleware.authUser, chatController.createChat);

/* GET /api/chat */
router.get("/", authMiddleware.authUser, chatController.getAllChats);

/* GET /api/chat/message */
router.get("/message/:id", authMiddleware.authUser, chatController.getAllMessages);

module.exports = router;
