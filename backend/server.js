import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";


dotenv.config();

const app = express();


// MIDDLEWARE
app.use(cors());

app.use(express.json());

app.use(
  "/uploads",
  express.static("uploads")
);


// ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/rides",
  rideRoutes
);

app.use(
  "/api/complaints",
  complaintRoutes
);

app.use(
  "/api/requests",
  requestRoutes
);

// MONGODB CONNECTION
const connectDB = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI,
      {
        serverSelectionTimeoutMS: 5000,
      }
    );

    console.log(
      "MongoDB Connected"
    );

  } catch (error) {

    console.log(
      "Mongo Error:",
      error
    );

    process.exit(1);

  }

};

connectDB();


// SERVER
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});