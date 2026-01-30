import { useEffect } from "react"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ChatSidebar({ chats, setChats, chatId, setChatId }) {
  // 🔹 Fetch all chats on load
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

        // Auto-select latest chat
        if (data.length > 0 && !chatId) {
          setChatId(data[0]._id)
        }
      } catch (err) {
        console.error("Failed to fetch chats", err)
      }
    }

    fetchChats()
  }, [])

  // 🔹 Create new chat
  const createNewChat = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/chat/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })

      const newChat = await res.json()

      setChats(prev => [newChat, ...prev])
      setChatId(newChat._id)
    } catch (err) {
      console.error("Failed to create chat", err)
    }
  }

  // 🔹 Delete chat
  const deleteChat = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/chat/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })

      setChats(prev => prev.filter(chat => chat._id !== id))

      if (chatId === id) {
        setChatId(null)
      }
    } catch (err) {
      console.error("Failed to delete chat", err)
    }
  }

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      {/* New Chat Button */}
      <button
        onClick={createNewChat}
        className="m-3 p-2 rounded bg-blue-600 hover:bg-blue-700"
      >
        + New Chat
      </button>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat,index) => (
          <div
            key={chat._id || index}
            className={`flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-gray-800 ${
              chatId === chat._id ? "bg-gray-800" : ""
            }`}
            onClick={() => setChatId(chat._id)}
          >
            <span className="truncate">{chat.title}</span>

            <button
              onClick={(e) => {
                e.stopPropagation()
                deleteChat(chat._id)
              }}
              className="text-red-400 hover:text-red-600"
            >
            <FontAwesomeIcon icon={faTrash}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatSidebar
