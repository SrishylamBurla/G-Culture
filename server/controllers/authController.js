import User from "../models/User.js";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });
  const user = await User.create({ name, email, password });
  if (user) {
    res
      .status(201)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        password: user.password,
        avatar: user.avatar || null,
        token: generateToken(user._id),
      });
  } else res.status(400).json({ message: "Invalid user data" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      password: user.password,
      avatar: user.avatar || null,
      token: generateToken(user._id),
    });
  } else res.status(401).json({ message: "Invalid email or password" });
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
    });
  else res.status(404).json({ message: "User not found" });
};

export const updateAvatar = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (req.file) {
    const uploadRes = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
    });
    user.avatar = uploadRes.secure_url;
  }
  const updatedUser = await user.save({ validateBeforeSave: false });

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    avatar: updatedUser.avatar,
    token: generateToken(updatedUser._id),
  });
};

export const updateName = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    user.name = name;

    const updatedUser = await user.save({ validateBeforeSave: false });

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      token: generateToken(updatedUser._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update name" });
  }
};


export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: "All fields required" });

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect current password" });

    user.password = newPassword;

    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update password" });
  }
};
