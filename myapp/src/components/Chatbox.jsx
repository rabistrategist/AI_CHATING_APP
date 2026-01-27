import { useEffect, useState } from "react"
import Message from "./Message"

export default function ChatBox() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [chatId, setChatId] = useState(null)
console.log("CHAT ID:", chatId)

useEffect(() => {
  const savedChatId = localStorage.getItem("chatId")
  if (savedChatId) setChatId(savedChatId)
}, [])

useEffect(() => {
  if (chatId) localStorage.setItem("chatId", chatId)
}, [chatId])

  // ✅ FETCH HISTORY WHEN chatId CHANGES
  useEffect(() => {
    if (!chatId) return

    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/chat/${chatId}`
        )
        const data = await res.json()
        setMessages(data)
      } catch (error) {
        console.error("Failed to load history", error)
      }
    }

    fetchHistory()
  }, [chatId])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          chatId,
        }),
      })

      const data = await res.json()

      // 🔑 set chatId ONLY once (first message)
      if (!chatId) setChatId(data.chatId)

setMessages(prev => [
  ...prev,
  {
    role: "assistant",
    content: formatMessage(data.reply),
  },
])
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Something went wrong",
        },
      ])
    } finally {
      setLoading(false)
    }
  }


const deleteMessage = async (chatId) => {
  try {
    await fetch(`http://localhost:5000/api/chat/${chatId}`, {
      method: "DELETE",
    })

    // remove message from UI
    setMessages(prev =>
      prev.filter(msg => msg._id !== chatId)
    )
  } catch (error) {
    console.error("Failed to delete message", error)
  }
}

const formatMessage = (text, wordsPerLine = 15) => {
  const words = text.split(" ")
  let result = ""

  for (let i = 0; i < words.length; i++) {
    result += words[i] + " "
    if ((i + 1) % wordsPerLine === 0) {
      result += "\n"
    }
  }

  return result.trim()
}

  return (
    <main className="flex-1 flex flex-col p-4">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-40">
       {messages.map(msg => (
  <Message
    key={msg._id}
    _id={msg._id}
    role={msg.role}
    content={msg.content}
    onDelete={deleteMessage}
  />
))}
        {loading && <p className="text-gray-400">AI is typing...</p>}
      </div>

<div className="fixed bottom-8 left-0 w-full bg-white border-t p-3 flex gap-2 z-40">
  <input
    className="flex-1 p-3 border rounded-xl outline-none"
    value={input}
    onChange={e => setInput(e.target.value)}
    onKeyDown={e => e.key === "Enter" && sendMessage()}
    placeholder="Type a message..."
  />
  <button
    onClick={sendMessage}
    disabled={loading}
    className="bg-indigo-600 text-white px-5 rounded-xl disabled:opacity-50"
  >
    Send
  </button>
</div>
    </main>
  )
}
