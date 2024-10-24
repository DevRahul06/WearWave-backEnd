import ErrorHandler from "../middleware/error.js";
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

console.log(process.env.JWT_SECRET_KEY);

// Route for user Login
const loginUser = async (req, res) => {};

// Route for user Register
const registerUser = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user already exists
      const exists = await userModel.findOne({ email });
      if (exists) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }
  
      // Validate email format
      if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Please enter a valid email" });
      }
  
      // Validate password strength
      if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Please enter a strong password" });
      }
  
      // Hashing user password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Creating a new user
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
      });
  
      const user = await newUser.save();
  
      // Create token using the user's ID
      const token = createToken(user._id);
      res.status(201).json({ success: true, token });
    } catch (error) {
      console.error("Error during registration: ", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  

// Route for Admin Login

const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
