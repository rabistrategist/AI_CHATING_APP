import { useEffect, useState } from "react"
import Header from "../components/Header"
import ChatBox from "../components/Chatbox"
import Footer from "../components/Footer"

function ChatPage() {
  const [chatId, setChatId] = useState(null)
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <ChatBox chatId={chatId} setChatId={setChatId} />
      <Footer />
    </div>
  )
}

export default ChatPage
