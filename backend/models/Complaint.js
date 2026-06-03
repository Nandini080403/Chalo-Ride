import mongoose from "mongoose";

const complaintSchema =
  new mongoose.Schema(
    {

      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      reportedBy: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      against: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      status: {
        type: String,

        enum: [
          "pending",
          "resolved",
          "suspended",
        ],

        default: "pending",
      },

    },

    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Complaint",
  complaintSchema
);