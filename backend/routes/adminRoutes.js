import express from "express";

import User from "../models/User.js";
import Ride from "../models/Ride.js";
import Complaint from "../models/Complaint.js";

const router = express.Router();


// ================= OVERVIEW =================
router.get(
  "/overview",
  async (req, res) => {

    try {

      // TOTAL USERS
      const totalRiders =
        await User.countDocuments();

      // ACTIVE RIDES
      const activeRides =
        await Ride.countDocuments();

      // PENDING VERIFICATIONS
      const pendingVerifications =
        await User.countDocuments({
          isVerified: false,
        });

      // TOTAL EARNINGS
      const rides =
        await Ride.find();

      let totalEarnings = 0;

      rides.forEach((ride) => {

        totalEarnings +=
          ride.fare || 0;

      });

      res.json({

        totalRiders,

        activeRides,

        pendingVerifications,

        totalEarnings,

      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


// ================= GET USERS =================
router.get(
  "/users",
  async (req, res) => {

    try {

      const users =
        await User.find();

      res.json(users);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


// ================= VERIFY USER =================
router.put(
  "/verify/:id",
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {

        return res.status(404).json({
          message: "User not found",
        });

      }

      user.isVerified = true;

      await user.save();

      res.json({
        message:
          "User verified successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

export default router;

//
// ================= GET COMPLAINTS =================
router.get(
  "/complaints",
  async (req, res) => {

    try {

      const complaints =
        await Complaint.find()
          .sort({
            createdAt: -1,
          });

      res.json(complaints);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


//
// ================= RESOLVE COMPLAINT =================
router.put(
  "/complaints/resolve/:id",
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
        message: error.message,
      });

    }

  }
);


//
// ================= SUSPEND USER =================
router.put(
  "/complaints/suspend/:id",
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
        message: error.message,
      });

    }

  }
);

//
// ================= EARNINGS =================
router.get(
  "/earnings",
  async (req, res) => {

    try {

      const rides =
        await Ride.find();

      // TOTAL REVENUE
      let totalRevenue = 0;

      rides.forEach((ride) => {

        totalRevenue +=
          ride.fare || 0;

      });

      // TOTAL RIDES
      const totalRides =
        rides.length;

      // AVERAGE PER RIDE
      const averagePerRide =
        totalRides > 0
          ? Math.round(
              totalRevenue /
                totalRides
            )
          : 0;

      res.json({

        totalRevenue,

        totalRides,

        averagePerRide,

      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

//
// ================= MONTHLY EARNINGS =================
router.get(
  "/earnings/monthly",
  async (req, res) => {

    try {

      const rides =
        await Ride.find();

      const monthlyData = {};

      rides.forEach((ride) => {

        const date =
          new Date(
            ride.createdAt
          );

        const month =
          date.toLocaleString(
            "default",
            {
              month: "short",
            }
          );

        if (
          !monthlyData[month]
        ) {

          monthlyData[month] = 0;

        }

        monthlyData[month] +=
          ride.fare || 0;

      });

      const formattedData =
        Object.keys(
          monthlyData
        ).map((month) => ({

          month,

          revenue:
            monthlyData[
              month
            ],

        }));

      res.json(
        formattedData
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);

//
// ================= TOP EARNING RIDERS =================
router.get(
  "/top-riders",
  async (req, res) => {

    try {

      const rides =
        await Ride.find()
          .populate(
            "driver",
            "name email"
          );

      const riderMap = {};

      rides.forEach((ride) => {

        if (!ride.driver) return;

        const riderId =
          ride.driver._id.toString();

        if (
          !riderMap[riderId]
        ) {

          riderMap[riderId] = {

            name:
              ride.driver.name,

            email:
              ride.driver.email,

            totalEarned: 0,

          };

        }

        riderMap[
          riderId
        ].totalEarned +=
          ride.fare || 0;

      });

      const topRiders =
        Object.values(
          riderMap
        )
          .sort(
            (a, b) =>
              b.totalEarned -
              a.totalEarned
          )
          .slice(0, 5);

      res.json(
        topRiders
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);