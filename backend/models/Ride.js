import mongoose from "mongoose";

const rideSchema =
  new mongoose.Schema(
    {
      driver: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      from: {
        type: String,
        required: true,
      },

      to: {
        type: String,
        required: true,
      },

      date: {
        type: String,
      },

      time: {
        type: String,
      },

      vehicle: {
        type: String,
      },

      seats: {
        type: Number,
        default: 1,
      },

      fare: {
        type: Number,
        default: 0,
      },

      distance: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Ride",
  rideSchema
);