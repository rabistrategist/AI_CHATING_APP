import { useState } from "react"
import Header from "../components/Header"
import ChatBox from "../components/Chatbox"
import Footer from "../components/Footer"
import ChatSidebar from "../components/ChatSidebar"

function ChatPage() {
  const [chatId, setChatId] = useState(null)
  const [chats, setChats] = useState([])

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <ChatSidebar chatId={chatId} setChatId={setChatId} chats={chats} setChats={setChats} />

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <ChatBox chatId={chatId} />
        </div>
      </div>

      {/* Footer (optional) */}
      <Footer />
    </div>
  )
}

export default ChatPage


