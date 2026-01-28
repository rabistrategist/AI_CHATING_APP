import express from "express"
import { sendMessage, getChatHistory, deleteMessage, getChats} from "../controllers/chatController.js"
import authenticate from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/chat",authenticate, sendMessage)
router.get("/chat/:chatId",authenticate, getChatHistory)
router.delete("/message/:messageId", authenticate, deleteMessage)
router.get("/chat",authenticate, getChats)
export default router