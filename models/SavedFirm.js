import mongoose from "mongoose";

const SavedFirmSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    crd: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

// Prevent duplicate save (same user + same firm)
SavedFirmSchema.index({ userId: 1, crd: 1 }, { unique: true });

export default mongoose.models.SavedFirm ||
  mongoose.model("SavedFirm", SavedFirmSchema);
