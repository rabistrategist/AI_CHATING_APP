import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRobot } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  return (
<header className="bg-blue-900 text-white p-8 text-[24px] flex justify-between font-medium">
<div> <FontAwesomeIcon className = "text-[28px] mr-2" icon={faRobot}/> AI Chating App </div>
   {user && (
        <button
          onClick={handleLogout}
          className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg font-medium hover:bg-gray-100">
          Logout
        </button>
      )}
</header>
  )
}

export default Header