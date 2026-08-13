import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email?: string;
  phone: string;
  subject?: string;
  message: string;
  status: "New" | "Read" | "Replied";
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    subject: { type: String, default: "General Inquiry", trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["New", "Read", "Replied"],
      default: "New",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);
