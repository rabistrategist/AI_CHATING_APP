import bcrypt from "bcryptjs"
import User from "../models/UserModel.js"
import jwt from "jsonwebtoken"
import { generateAccessToken, generateRefreshToken} from "../utils/generateTokens.js"


//Refresh Token End Point:
export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" })

  const user = await User.findOne({ refreshToken })
  if (!user)
    return res.status(403).json({ message: "Invalid refresh token" })

  try {
    jwt.verify(refreshToken, process.env.JWT_SECRET)

    const newAccessToken = generateAccessToken(user._id)

    res.json({ accessToken: newAccessToken })
  } catch (error) {
    res.status(403).json({ message: "Token expired" })
  }
}


// REGISTER
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })
  if (userExists)
    return res.status(400).json({ message: "User already exists" })

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  const accessToken = generateAccessToken(user._id)
  const refreshToken = generateRefreshToken(user._id)

  user.refreshToken = refreshToken
  await user.save()

  res.status(201).json({
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  })
}


// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user)
    return res.status(401).json({ message: "Invalid credentials" })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch)
    return res.status(401).json({ message: "Invalid credentials" })

  const accessToken = generateAccessToken(user._id)
  const refreshToken = generateRefreshToken(user._id)

  user.refreshToken = refreshToken
  await user.save()

  res.json({
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  })
}


//LOGOUT API
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" })
    }

    const user = await User.findOne({ refreshToken })

    if (!user) {
      return res.status(204).send() // already logged out
    }

    user.refreshToken = null
    await user.save()

    res.json({ message: "Logged out successfully" })
  } catch (error) {
    console.error("LOGOUT ERROR:", error)
    res.status(500).json({ message: "Logout failed" })
  }
}