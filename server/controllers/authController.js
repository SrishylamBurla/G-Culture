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
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
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
    const { name } = req.body;

    if (!name)
      return res.status(400).json({ message: "Name is required" });

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    // New token because name changed
    const token = jwt.sign(
      { id: updatedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // FINAL RESPONSE (MATCHES YOUR TESTS)
    return res.status(200).json({
      message: "Name updated",
      name: updatedUser.name,
      token,
      user: updatedUser,
    });

  } catch (error) {
    console.error("UPDATE-NAME ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



// export const updateName = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     console.log("BODY FROM FRONTEND:", req.body);

// console.log("TOKEN:", req.headers.authorization);

//     const { name } = req.body;
//     if (!name) return res.status(400).json({ message: "Name is required" });

//     user.name = name;

//     const updatedUser = await user.save({ validateBeforeSave: false });

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       avatar: updatedUser.avatar,
//       token: generateToken(updatedUser._id),
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update name" });
//   }
// };

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

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// export const getUsers = async (req, res) => {
//   try {
//     const page = Number(req.query.page) || 1;
//     const limit = 20;
//     const skip = (page - 1) * limit;

//     const keyword = req.query.search
//       ? {
//           name: { $regex: req.query.search, $options: "i" }
//         }
//       : {};

//     const users = await User.find(keyword)
//       .select("-password")
//       .skip(skip)
//       .limit(limit);

//     const count = await User.countDocuments(keyword);

//     res.json({
//       users,
//       page,
//       pages: Math.ceil(count / limit),
//       total: count
//     });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// };

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, isAdmin } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;

    if (typeof isAdmin === "boolean") {
      user.isAdmin = isAdmin;
    }

    const updatedUser = await user.save({ validateBeforeSave: false });

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      avatar: updatedUser.avatar,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const newUser = await User.create({
      name,
      email,
      password,
      isAdmin: isAdmin || false,
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};
