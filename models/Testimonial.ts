import mongoose, { Schema } from "mongoose";

const TestimonialSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
    },
    text: {
      type: String,
      required: [true, "Testimonial text is required"],
      trim: true,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
