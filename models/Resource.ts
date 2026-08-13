import mongoose, { Schema, Document } from "mongoose";

export interface IResource extends Document {
  title: string;
  description?: string;
  fileUrl: string;
  category: string;
  fileSize?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    fileUrl: { type: String, required: true },
    category: { type: String, default: "General" },
    fileSize: { type: String, default: "PDF Document" },
  },
  { timestamps: true }
);

export default mongoose.models.Resource || mongoose.model<IResource>("Resource", ResourceSchema);
