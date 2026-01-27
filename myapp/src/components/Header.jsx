import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons"

function Header() {
  return (
<header className="bg-blue-900 text-white p-8 text-[24px] flex justify-between font-medium">
<div> <FontAwesomeIcon className = "text-[28px] mr-2" icon={faRobot}/> AI Chating App </div>
<FontAwesomeIcon className = "text-[24px] bg-white p-2 rounded-[5px] text-black" icon={faUser}/>

</header>
  )
}

export default Header