import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ChatSidebar({ chats, setChats, chatId, setChatId }) {

  // 🔹 Create new chat
  const createNewChat = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/chat/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })

      const newChat = await res.json()

      setChats(prev => [newChat, ...prev])
      setChatId(newChat._id)
      setChats(prev => prev.map(c =>
       c._id === newChat._id ? { ...c } : c
       ))
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
    <div className="w-64 bg-blue-100 border-r border-gray-300 flex flex-col">
      {/* New Chat Button */}
      <button
        onClick={createNewChat}
        className="m-3 p-2 rounded bg-black text-white hover:bg-blue-700"
      >
        + New Chat
      </button>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map(chat => (
          <div
            key={chat._id}
            onClick={() => setChatId(chat._id)}
            className={`flex justify-between items-center px-3 py-2 cursor-pointer
              ${chatId === chat._id ? "m-4 bg-gray-200 text-black shadow-md" : "hover:bg-gray-300 m-4 text-black"}
            `}
          > 
            <span className="truncate"><FontAwesomeIcon icon={faPenToSquare} /> {chat.title}</span>

            <button
              onClick={(e) => {
                e.stopPropagation()
                deleteChat(chat._id)
              }}
              className="text-red-500 hover:text-red-700"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatSidebar
