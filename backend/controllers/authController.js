import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";


// ================= SIGNUP =================
export const registerUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password,
      department,
      year,
    } = req.body;

    // CHECK EXISTING USER
    const userExists =
      await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    // HASH PASSWORD
    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    // CREATE USER
    const user =
      await User.create({

        name,

        email,

        password: hashedPassword,

        department,

        year,

        role: "student",

        isVerified: false,

        studentIdProof:
          req.file?.filename,

      });

    // RESPONSE
    res.status(201).json({
      _id: user._id,

      name: user.name,

      email: user.email,

      department: user.department,

      year: user.year,

      role: user.role,

      isVerified: user.isVerified,

      studentIdProof:
        user.studentIdProof,

      token: generateToken(
        user._id
      ),
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// ================= LOGIN =================
export const loginUser = async (
  req,
  res
) => {

  try {

    const { email, password } =
      req.body;

    // FIND USER
    const user =
      await User.findOne({
        email,
      });

    // CHECK PASSWORD
    if (
      user &&
      (await bcrypt.compare(
        password,
        user.password
      ))
    ) {

      res.json({

        _id: user._id,

        name: user.name,

        email: user.email,

        department: user.department,

        year: user.year,

        role: user.role,

        isVerified: user.isVerified,

        token: generateToken(
          user._id
        ),

      });

    } else {

      res.status(401).json({
        message:
          "Invalid email or password",
      });

    }

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

export const updateProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {

        return res.status(404).json({

          message:
            "User not found",

        });

      }

      user.bio =
        req.body.bio ||
        user.bio;

      user.vehicle =
        req.body.vehicle ||
        user.vehicle;

      user.preferredRoute =
        req.body.preferredRoute ||
        user.preferredRoute;

      user.availability =
        req.body.availability ||
        user.availability;


      const updatedUser =
        await user.save();


      res.json(
        updatedUser
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };


// ================= JWT TOKEN =================
const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

};