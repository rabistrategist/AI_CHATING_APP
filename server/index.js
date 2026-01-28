import cors from "cors"
import "dotenv/config"
import express from "express"
import connectDB from "./config/db.js"

connectDB()

const app = express()

app.use(cors({
  origin: "http://localhost:3000", // or your frontend URL
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

app.get("/ping", (req, res) => {
  res.json({ status: "Backend alive" })
})

import chatRoutes from "./routes/chatRoutes.js"
import userRoutes from "./routes/userRoutes.js"

app.use("/api", chatRoutes)
app.use("/api/auth", userRoutes)