import mongoose, { Schema } from "mongoose";

const TopperSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    year: {
      type: String,
      required: [true, "Academic year is required"],
      default: "2026",
      trim: true,
    },
    board: {
      type: String,
      required: [true, "Board class is required"],
      default: "Intermediate (Class 12)",
      trim: true,
    },
    rank: {
      type: Number,
      default: 1,
    },
    rankType: {
      type: String,
      default: "District Rank",
      trim: true,
    },
    percentage: {
      type: Number,
      required: [true, "Percentage is required"],
    },
    photo: {
      type: String,
      required: [true, "Student photo is required"],
    },
    category: {
      type: String,
      enum: ["General Rank Holder", "Subject Topper"],
      default: "General Rank Holder",
    },
    subject: {
      type: String,
      default: "",
      trim: true,
    },
    marks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Topper || mongoose.model("Topper", TopperSchema);
