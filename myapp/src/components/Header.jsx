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
<header className="bg-blue-50 shadow-md text-black p-4 text-[20px] flex justify-between font-medium">
<div> <FontAwesomeIcon className = "text-[24px] mr-2" icon={faRobot}/> AI Chating App </div>
   {user && (
        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-1.5 text-sm rounded-lg font-medium hover:bg-black hover:text-white">
          Logout
        </button>
      )}
</header>
  )
}

export default Header