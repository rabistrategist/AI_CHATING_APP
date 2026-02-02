import { useEffect, useState } from "react"
import Header from "../components/Header"
import ChatBox from "../components/Chatbox"
import Footer from "../components/Footer"
import ChatSidebar from "../components/ChatSidebar"

function ChatPage() {
  const [chatId, setChatId] = useState(null)
  const [chats, setChats] = useState([])

  // 🔹 1. Fetch all chats on page load
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/chat", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })

        if (!res.ok) return

        const data = await res.json()
        setChats(data)
      } catch (error) {
        console.error("Failed to fetch chats", error)
      }
    }

    fetchChats()
  }, [])

  // 🔹 2. Auto-select latest chat when chats load
  useEffect(() => {
    if (chats.length > 0 && !chatId) {
      setChatId(chats[0]._id)
    }
  }, [chats, chatId])

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <ChatSidebar
          chats={chats}
          setChats={setChats}
          chatId={chatId}
          setChatId={setChatId}
        />

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {chatId ? (
            <ChatBox
              chatId={chatId}
              chats={chats}
              setChats={setChats}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select or create a chat
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ChatPage
