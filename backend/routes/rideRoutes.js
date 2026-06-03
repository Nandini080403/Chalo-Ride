import express from "express";
import Ride from "../models/Ride.js";

import {
  createRide,
  getRides,
  getSingleRide,
  getDriverRides,
} from "../controllers/rideController.js";

const router =
  express.Router();

router.post(
  "/",
  createRide
);

router.get(
  "/",
  getRides
);

router.get(
  "/user/:id",
  async (req, res) => {

    try {

      const rides =
        await Ride.find({

          driver:
            req.params.id,

        }).sort({

          createdAt: -1,

        });

      res.json(rides);

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  }
);

router.get(
  "/:id",
  getSingleRide
);

router.get(
  "/driver/:driverId",
  getDriverRides
);

export default router;