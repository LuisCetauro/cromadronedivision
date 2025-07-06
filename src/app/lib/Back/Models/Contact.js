import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: String,
    cellphone: String,
    email: String,
    workplace: String,
    message: String,
  },
  { timestamps: true }
);

export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
