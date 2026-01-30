import express from "express"
import { sendMessage, getChatHistory, deleteMessage, getChats, createChat, deleteChat} from "../controllers/chatController.js"
import authenticate from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/chat",authenticate, sendMessage)
router.get("/chat",authenticate, getChats)
router.get("/chat/:chatId",authenticate, getChatHistory)
router.delete("/message/:messageId", authenticate, deleteMessage)

router.post("/chat/new", authenticate, createChat)
router.delete("/chat/:chatId", authenticate, deleteChat)

export default router