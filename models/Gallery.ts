import mongoose, { Schema } from "mongoose";

const GallerySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["campus", "classroom", "sports", "events", "labs"],
    },
    src: {
      type: String,
      required: [true, "Image source URL is required"],
    },
    alt: {
      type: String,
      required: [true, "Alt text is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
