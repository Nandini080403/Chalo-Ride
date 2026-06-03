import mongoose from "mongoose";

const requestSchema =
  new mongoose.Schema(
    {
      ride: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Ride",
      },

      rider: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      driver: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      status: {
        type: String,
        default: "pending",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Request",
  requestSchema
);