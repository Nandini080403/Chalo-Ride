import Request from "../models/Request.js";
import Ride from "../models/Ride.js";



// ================= CREATE REQUEST =================
export const createRequest =
  async (req, res) => {

    try {

      const {
        rideId,
        riderId,
      } = req.body;

      // FIND RIDE
      const ride =
        await Ride.findById(
          rideId
        );

      if (!ride) {

        return res.status(404).json({
          message: "Ride not found",
        });

      }

      const existingRequest =
        await Request.findOne({

            ride: rideId,

            rider: riderId,

        });

    if (existingRequest) {

        return res.status(400).json({
            message:
            "Request already sent",
        });

    }

      // CREATE REQUEST
      const request =
        await Request.create({

          ride: rideId,

          rider: riderId,

          driver: ride.driver,

          status: "pending",

        });

      res.status(201).json(
        request
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };


// ================= GET USER REQUESTS =================
export const getUserRequests =
  async (req, res) => {

    try {

      const requests =
        await Request.find({

          rider:
            req.params.userId,

        })

        .populate("ride")
        .populate("driver");

      res.json(requests);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };


// ================= GET DRIVER REQUESTS =================
export const getDriverRequests =
  async (req, res) => {

    try {

      const requests =
        await Request.find({

          driver:
            req.params.driverId,

        })

        .populate("ride")
        .populate("rider");

      res.json(requests);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };


// ================= UPDATE STATUS =================
export const updateRequestStatus =
  async (req, res) => {

    try {

      const request =
        await Request.findById(
          req.params.id
        );

      if (!request) {

        return res.status(404).json({
          message:
            "Request not found",
        });

      }

      request.status =
        req.body.status;

      await request.save();

      res.json(request);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };