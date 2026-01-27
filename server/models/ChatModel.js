import mongoose from "mongoose"

const chatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "New Chat",
    },
  },
  { timestamps: true }
)

export default mongoose.model("Chat", chatSchema)
