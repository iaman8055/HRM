import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "../../../model/user/user.js";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  console.log(req.body);
  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Await the findOne
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save(); // Await the save

    const token = jwt.sign(
      { userId: user._id, name: user.fullName },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      message: "SignUp Successful",
      token,
      user: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to register", error: error.message });
  }
};

export default signup;
