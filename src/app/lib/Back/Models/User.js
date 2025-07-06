import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    executive: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
    },
    wpp: {
      type: String,
    },
    src: {
      type: String,
    },
    descp: {
      type: String,
    },
  },
  { timestamps: true }
);
export const User = mongoose.models?.User || mongoose.model("User", userSchema);
