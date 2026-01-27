import express from "express"
import { sendMessage, getChatHistory, deleteMessage, getChats} from "../controllers/chatController.js"

const router = express.Router()

router.post("/chat", sendMessage)
router.get("/chat/:chatId", getChatHistory)
router.delete("/chat/:chatId", deleteMessage)
router.get("/chat", getChats)
export default router