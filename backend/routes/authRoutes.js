import express from "express";

import {
  registerUser,
  loginUser,
  updateProfile,
} from "../controllers/authController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/signup",
  upload.single("studentIdProof"),
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.put(
  "/profile/:id",
  updateProfile
);

export default router;