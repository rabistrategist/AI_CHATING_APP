import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
      return !this.googleId
      }
    },
    refreshToken: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
  },
  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema)