import mongoose from "mongoose";

const LastDeliveredSchema = new mongoose.Schema({
  nameEn: {
    type: String,
    required: [true, "English name is required"],
    trim: true,
  },
  nameAr: {
    type: String,
    required: [true, "Arabic name is required"],
    trim: true,
  },
  locationEn: {
    type: String,
    required: [true, "English location is required"],
    trim: true,
  },
  locationAr: {
    type: String,
    required: [true, "Arabic location is required"],
    trim: true,
  },
  dateEn: {
    type: String,
    required: [true, "English date is required"],
    trim: true,
  },
  dateAr: {
    type: String,
    required: [true, "Arabic date is required"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Image URL is required"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if model already exists before creating (prevents Hot Reload issues)
const LastDelivered =
  mongoose.models.LastDelivered ||
  mongoose.model("LastDelivered", LastDeliveredSchema);

export default LastDelivered;
