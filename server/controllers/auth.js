import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Generate a salt value
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: passwordHash });

    const savedUser = await newUser.save();
    res.status(201).json({ savedUser, message: "User saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to get user information" });
  }
};

//LOGIN USER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(401).json({ mesg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ mesg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Error in Logging" });
  }
};
