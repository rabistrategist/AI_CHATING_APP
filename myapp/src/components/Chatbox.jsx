import { useEffect, useState } from "react"
import Message from "./Message"

export default function ChatBox({ chatId }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  // 🔁 Reset messages when chat changes
  useEffect(() => {
    setMessages([])
  }, [chatId])

  // 📥 Fetch chat history
  useEffect(() => {
    if (!chatId) return

    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/chat/${chatId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )

        if (!res.ok) return

        const data = await res.json()
        setMessages(data.messages || [])
      } catch (err) {
        console.error("Failed to load chat history", err)
      }
    }

    fetchHistory()
  }, [chatId])

  // 📤 Send message
  const sendMessage = async () => {
    if (!input.trim() || !chatId) return

    const userMessage = { role: "user", content: input }
    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          messages: updatedMessages,
          chatId,
        }),
      })

      const data = await res.json()

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.reply },
      ])
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "⚠️ Something went wrong" },
      ])
    } finally {
      setLoading(false)
    }
  }

  // 🗑️ Delete message
  const deleteMessage = async (messageId) => {
    try {
      await fetch(`http://localhost:5000/api/message/${messageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })

      setMessages(prev =>
        prev.filter(msg => msg._id !== messageId)
      )
    } catch (err) {
      console.error("Failed to delete message", err)
    }
  }

  return (
    <main className="flex-1 flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-40">
        {messages.map((msg, index) => (
          <Message
            key={msg._id || index}
            _id={msg._id}
            role={msg.role}
            content={msg.content}
            onDelete={deleteMessage}
          />
        ))}

        {loading && (
          <p className="text-gray-400 text-sm">AI is typing...</p>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-3 flex gap-2 mb-6">
        <input
          className="flex-1 p-3 border rounded-xl outline-none bg-gray-200"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-indigo-600 text-white px-5 rounded-xl"
        >
          Send
        </button>
      </div>
    </main>
  )
}
