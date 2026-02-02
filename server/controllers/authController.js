import { OAuth2Client } from "google-auth-library"
import User from "../models/UserModel.js"
import jwt from "jsonwebtoken"

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body
    if (!token) {
      return res.status(400).json({ message: "No token provided" })
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const { email, name, sub } = ticket.getPayload()

    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: sub,
        provider: "google",
      })
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    )

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    user.refreshToken = refreshToken
    await user.save()

    res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        provider: user.provider,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(401).json({ message: "Google authentication failed" })
  }
}

