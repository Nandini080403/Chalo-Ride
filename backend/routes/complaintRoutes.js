import express from "express";

import Complaint from "../models/Complaint.js";
import User from "../models/User.js";

const router = express.Router();


// ================= CREATE COMPLAINT =================
router.post(
  "/create",
  async (req, res) => {

    try {

      const {
        title,
        description,
        reportedBy,
        against,
      } = req.body;

      // CHECK USERS EXIST
      const reportedUser =
        await User.findById(
          reportedBy
        );

      const againstUser =
        await User.findById(
          against
        );

      if (
        !reportedUser ||
        !againstUser
      ) {

        return res.status(404).json({
          message:
            "User not found",
        });

      }

      // CREATE COMPLAINT
      const complaint =
        await Complaint.create({

          title,

          description,

          reportedBy,

          against,

        });

      res.status(201).json(
        complaint
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);


// ================= GET ALL COMPLAINTS =================
router.get(
  "/",
  async (req, res) => {

    try {

      const complaints =
        await Complaint.find()

          .populate({
            path: "reportedBy",
            model: "User",
            select:
              "name email",
          })

          .populate({
            path: "against",
            model: "User",
            select:
              "name email",
          })

          .sort({
            createdAt: -1,
          });

      res.json(
        complaints
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);


// ================= RESOLVE COMPLAINT =================
router.put(
  "/resolve/:id",
  async (req, res) => {

    try {

      const complaint =
        await Complaint.findById(
          req.params.id
        );

      if (!complaint) {

        return res.status(404).json({
          message:
            "Complaint not found",
        });

      }

      complaint.status =
        "resolved";

      await complaint.save();

      res.json({
        message:
          "Complaint resolved",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);


// ================= SUSPEND USER =================
router.put(
  "/suspend/:id",
  async (req, res) => {

    try {

      const complaint =
        await Complaint.findById(
          req.params.id
        );

      if (!complaint) {

        return res.status(404).json({
          message:
            "Complaint not found",
        });

      }

      complaint.status =
        "suspended";

      await complaint.save();

      res.json({
        message:
          "User suspended",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);

export default router;