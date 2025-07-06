import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    executive: { type: String },
    count: { type: Number },
  },
  { timestamps: true }
);
export const Order =
  mongoose.models?.User || mongoose.model("Order", orderSchema);
