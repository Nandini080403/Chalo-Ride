import jwt from "jsonwebtoken";

import User from "../models/User.js";

const adminMiddleware =
  async (req, res, next) => {

    try {

      const token =
        req.headers.authorization;

      if (!token) {

        return res.status(401).json({
          message:
            "No token provided",
        });

      }

      const decoded =
        jwt.verify(
          token.split(" ")[1],
          process.env.JWT_SECRET
        );

      const user =
        await User.findById(
          decoded.id
        );

      if (!user) {

        return res.status(404).json({
          message:
            "User not found",
        });

      }

      if (
        user.role !== "admin"
      ) {

        return res.status(403).json({
          message:
            "Access denied",
        });

      }

      req.user = user;

      next();

    } catch (error) {

      res.status(401).json({
        message:
          "Invalid token",
      });

    }

  };

export default adminMiddleware;