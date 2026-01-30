import { GoogleGenerativeAI } from "@google/generative-ai"
import Message from "../models/Messagemodel.js"
import Chat from "../models/ChatModel.js"
import mongoose from "mongoose"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const sendMessage = async (req, res) => {
  try {
    const { messages, chatId } = req.body
    const userId = req.userId

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Invalid messages" })
    }

    let chat
    // Use existing chat ONLY if it belongs to user
    if (chatId) {
      chat = await Chat.findOne({ _id: chatId, user: userId })
    }

    // Otherwise create a new chat for this user
    if (!chat) {
      chat = await Chat.create({
        user: userId,
        title: messages[0].content.slice(0, 30),
      })
    }

    // Save user message
    const lastUserMessage = messages[messages.length - 1]

    await Message.create({
      chatId: chat._id,
      role: "user",
      content: lastUserMessage.content,
    })

    // 4️⃣ AI response
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    })

    const result = await model.generateContent(
      messages.map(m => `${m.role}: ${m.content}`).join("\n")
    )

    const reply = result.response.text()

    await Message.create({
      chatId: chat._id,
      role: "assistant",
      content: reply,
    })

    res.json({ reply, chatId: chat._id })
  } catch (error) {
    console.error("CHAT CONTROLLER ERROR:", error)
    res.status(500).json({ error: "AI response failed" })
  }
}


export const getChatHistory = async (req, res) => {
  try {
    const { chatId } = req.params

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 })

    res.json({
      chatId,
      messages,
    })
  } catch (error) {
    console.error("FETCH CHAT HISTORY ERROR:", error)
    res.status(500).json({ error: "Failed to fetch history" })
  }
}

export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return res.status(400).json({ message: "Invalid message ID" })
    }

    const deleted = await Message.findByIdAndDelete(messageId)

    if (!deleted) {
      return res.status(404).json({ message: "Message not found" })
    }

    res.json({ message: "Message deleted" })
  } catch (error) {
    console.error("DELETE MESSAGE ERROR:", error)
    res.status(500).json({ error: "Failed to delete message" })
  }
}

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.userId })
      .sort({ updatedAt: -1 })

    res.json(chats)
  } catch (error) {
    console.error("Get Chats Error", error)
    res.status(500).json({ error: "Failed to fetch chats" })
  }
}

export const createChat = async (req, res) => {
  try {
    const chat = await Chat.create({
      user: req.userId,
      title: "New Chat",
    })

    res.status(201).json(chat)
  } catch (error) {
    console.error("CREATE CHAT ERROR:", error)
    res.status(500).json({ error: "Failed to create chat" })
  }
}

export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params
    const userId = req.userId

    // 1️⃣ Ensure chat belongs to logged-in user
    const chat = await Chat.findOneAndDelete({
      _id: chatId,
      user: userId,
    })

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" })
    }

    // 2️⃣ Delete all messages of this chat
    await Message.deleteMany({ chatId })

    res.json({ message: "Chat deleted successfully" })
  } catch (error) {
    console.error("DELETE CHAT ERROR:", error)
    res.status(500).json({ error: "Failed to delete chat" })
  }
}



