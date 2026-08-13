import mongoose, { Schema } from "mongoose";

const SiteSettingSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "default_settings",
    },
    bannerTitle: {
      type: String,
      default: "Admissions Open for Session 2026-27",
      trim: true,
    },
    bannerEnabled: {
      type: Boolean,
      default: true,
    },
    popupEnabled: {
      type: Boolean,
      default: true,
    },
    popupTitle: {
      type: String,
      default: "Admissions Open for Session 2026-27",
      trim: true,
    },
    popupContent: {
      type: String,
      default: "Join Abhilasha Academy for English & Hindi medium excellence. Registration forms for the new session are now available.",
      trim: true,
    },
    popupImage: {
      type: String,
      default: "",
      trim: true,
    },
    popupButtonText: {
      type: String,
      default: "Apply For Admission",
      trim: true,
    },
    popupButtonLink: {
      type: String,
      default: "/admissions",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SiteSetting || mongoose.model("SiteSetting", SiteSettingSchema);
