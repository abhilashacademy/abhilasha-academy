import mongoose, { Schema, Document } from "mongoose";

export interface IAdmission extends Document {
  studentName: string;
  parentName?: string;
  email?: string;
  phone: string;
  targetClass: string;
  medium?: string;
  message?: string;
  status: "Pending" | "Reviewed" | "Contacted" | "Approved";
  createdAt: Date;
}

const AdmissionSchema = new Schema<IAdmission>(
  {
    studentName: { type: String, required: true, trim: true },
    parentName: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    targetClass: { type: String, required: true, trim: true },
    medium: { type: String, default: "English Medium", trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Contacted", "Approved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Admission || mongoose.model<IAdmission>("Admission", AdmissionSchema);
