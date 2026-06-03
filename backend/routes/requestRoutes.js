import express from "express";

import {
  createRequest,
  getUserRequests,
  getDriverRequests,
  updateRequestStatus,
} from "../controllers/requestController.js";


const router =
  express.Router();


// CREATE REQUEST
router.post(
  "/",
  createRequest
);


// GET USER REQUESTS
router.get(
  "/user/:userId",
  getUserRequests
);


// GET DRIVER REQUESTS
router.get(
  "/driver/:driverId",
  getDriverRequests
);


// UPDATE REQUEST STATUS
router.put(
  "/:id",
  updateRequestStatus
);

export default router;