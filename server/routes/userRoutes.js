import express from "express"
import { registerUser, loginUser, refreshAccessToken, logout } from "../controllers/userController.js"
import authenticate from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/refresh", refreshAccessToken)
router.post("/logout",authenticate, logout)

export default router