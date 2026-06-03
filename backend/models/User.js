import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    department: {
      type: String,
    },

    year: {
      type: String,
    },

    role: {
      type: String,
      default: "student",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    studentIdProof: {
      type: String,
    },

    bio: {
      type: String,
      default: "",
    },  

    vehicle: {
      type: String,
      default: "",
    },

    preferredRoute: {
      type: String,
      default: "",
    },

    availability: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model(
  "User",
  userSchema
);

export default User;