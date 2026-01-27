import express from "express"
import { registerUser, loginUser, refreshAccessToken, logout } from "../controllers/userController.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/refresh", refreshAccessToken)
router.post("/logout", logout)

export default router