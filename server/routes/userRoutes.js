import express from "express"
import { registerUser, loginUser, refreshAccessToken, logout } from "../controllers/userController.js"
import authenticate from '../middlewares/authMiddleware.js'
import { googleLogin } from "../controllers/authController.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/refresh", refreshAccessToken)
router.post("/logout",authenticate, logout)

router.post("/google", googleLogin)

export default router