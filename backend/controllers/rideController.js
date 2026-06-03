import Ride from "../models/Ride.js";


// CREATE RIDE
export const createRide =
  async (req, res) => {

    try {

      const ride =
        await Ride.create({
          driver:
            req.body.driver,

          from:
            req.body.from,

          to:
            req.body.to,

          date:
            req.body.date,

          time:
            req.body.time,

          vehicle:
            req.body.vehicle,

          seats:
            req.body.seats,

          fare:
            req.body.fare,
        });

      res.status(201).json(
        ride
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };


// GET ALL RIDES
export const getRides =
  async (req, res) => {

    try {

      const rides =
        await Ride.find()
          .populate(
            "driver",
            "name department year"
          );

      res.json(rides);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

export const getSingleRide =
  async (req, res) => {

    try {

      const ride =
        await Ride.findById(
          req.params.id
        ).populate(
          "driver",
          "name email"
        );

      res.json(ride);

    } catch (error) {

      console.log(error);

         res.status(500).json({
           message:
             error.message,
        });

    }

  };

export const getDriverRides =
  async (req, res) => {

    try {

      const rides =
        await Ride.find({

          driver:
            req.params.driverId,

        }).populate(
          "driver",
          "name department year"
        );

      res.json(rides);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };