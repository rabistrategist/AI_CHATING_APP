import { GoogleGenerativeAI } from "@google/generative-ai"
import Message from "../models/Messagemodel.js"
import Chat from "../models/ChatModel.js"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const sendMessage = async (req, res) => {
  try {
    const { messages, chatId } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages" })
    }

    // Create new chat if not exists
    let chat
    if (!chatId) {
      chat = await Chat.create({})
    } else {
      chat = await Chat.findById(chatId)
    }

    // Save last user message
    const lastUserMessage = messages[messages.length - 1]
    await Message.create({
      chatId: chat._id,
      role: "user",
      content: lastUserMessage.content,
    })

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    })

    const prompt = messages
      .map(m =>
        m.role === "user"
          ? `User: ${m.content}`
          : `Assistant: ${m.content}`
      )
      .join("\n")

    const result = await model.generateContent(prompt)
    const reply = result.response.text()

    // Save assistant message
    await Message.create({
      chatId: chat._id,
      role: "assistant",
      content: reply,
    })

    res.json({
      reply,
      chatId: chat._id,
    })
  } catch (error) {
    console.error("CHAT CONTROLLER ERROR:", error)
    res.status(500).json({ error: "AI response failed" })
  }
}


export const getChatHistory = async (req, res) => {
  try {
    const { chatId } = req.params

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 })

    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" })
  }
}

export const deleteMessage = async (req, res) => {
  try {
    const { chatId } = req.params

    await Message.findByIdAndDelete(chatId)

    res.json({ message: "Message deleted" })
  } catch (error) {
    console.error("DELETE MESSAGE ERROR:", error)
    res.status(500).json({ error: "Failed to delete message" })
  }
}

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ updatedAt: -1 })
    res.json(chats)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chats" })
  }
}
