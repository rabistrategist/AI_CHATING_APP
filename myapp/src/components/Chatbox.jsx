import { useEffect, useState } from "react"
import Message from "./Message"

export default function ChatBox() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [chatId, setChatId] = useState(null)

  useEffect(() => {
  const fetchChats = async () => {
    const res = await fetch("http://localhost:5000/api/chat", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })

    if (!res.ok) return

    const chats = await res.json()

    if (chats.length > 0) {
      setChatId(chats[0]._id)       // ✅ triggers re-render
      localStorage.setItem("chatId", chats[0]._id)
    }
  }

  if (!chatId) {
    fetchChats()
  }
}, [])

  /* ----------------------------------
     Load chatId from localStorage
  -----------------------------------*/
  useEffect(() => {
    const savedChatId = localStorage.getItem("chatId")
    if (savedChatId) setChatId(savedChatId)
  }, [])

  /* ----------------------------------
     Persist chatId
  -----------------------------------*/
  useEffect(() => {
    if (chatId) localStorage.setItem("chatId", chatId)
  }, [chatId])

  /* ----------------------------------
     Fetch chat history
  -----------------------------------*/
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

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.clear()
            window.location.href = "/login"
          }
          return
        }

        const data = await res.json()
        setMessages(data.messages || [])
      } catch (error) {
        console.error("Failed to load chat history", error)
      }
    }

    fetchHistory()
  }, [chatId])

  /* ----------------------------------
     Send message
  -----------------------------------*/
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
        { role: "assistant", content: "⚠️ Something went wrong" },
      ])
    } finally {
      setLoading(false)
    }
  }

  /* ----------------------------------
     Delete single message
  -----------------------------------*/
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
    } catch (error) {
      console.error("Failed to delete message", error)
    }
  }

  /* ----------------------------------
     Format assistant message
  -----------------------------------*/
const formatMessage = (text = "", wordsPerLine = 15) => {
  if (typeof text !== "string") return ""

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

  /* ----------------------------------
     UI
  -----------------------------------*/
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

      {/* Input (Fixed Bottom) */}
      <div className="fixed bottom-8 bg-gray-600 border-t w-full p-3 flex gap-2 z-40">
        <input
          className="flex-1 p-3 border rounded-xl outline-none bg-gray-800"
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
