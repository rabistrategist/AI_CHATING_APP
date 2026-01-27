import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export default function Message({ _id, role, content, onDelete }) {
  const isUser = role === "user"

  return (
    <div
      className={`group rounded-xl mt-4 text-sm relative
        ${isUser
          ? "bg-indigo-600 text-white ml-auto w-fit px-8 py-4"
          : "bg-gray-200 text-gray-900 mr-auto w-fit p-8 whitespace-pre-line"}
      `}
    >
      {content}

      {/* 🗑️ DELETE BUTTON */}
      <button
        onClick={() => onDelete(_id)}
        className="absolute -top-2 -right-0 hidden group-hover:block
                   bg-red-500 text-white rounded-full px-4 text-xm shadow"
        title="Delete message"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  )
}
