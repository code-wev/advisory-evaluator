import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    savedFirms: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
