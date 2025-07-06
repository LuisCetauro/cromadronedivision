import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    Name: String,
    Phone: String,
    Email: String,
    Bussines: String,
    Message: String,
    ExecutiveName: String,
  },
  { timestamps: true }
);

export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
