import mongoose, { Schema } from "mongoose";

const FacilitySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    iconName: {
      type: String,
      default: "BookOpen",
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Facility || mongoose.model("Facility", FacilitySchema);
