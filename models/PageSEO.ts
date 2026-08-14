import mongoose, { Schema } from "mongoose";

export interface IPageSEO {
  pageSlug: string;
  title: string;
  description: string;
  keywords: string;
  updatedAt?: Date;
}

const PageSEOSchema = new Schema(
  {
    pageSlug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    keywords: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PageSEO || mongoose.model("PageSEO", PageSEOSchema);
