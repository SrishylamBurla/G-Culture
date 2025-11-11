import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });
  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, avatar:user.avatar || null, token: generateToken(user._id) });
  } else res.status(400).json({ message: 'Invalid user data' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin,avatar:user.avatar || null, token: generateToken(user._id) });
  } else res.status(401).json({ message: 'Invalid email or password' });
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin , avatar:user.avatar});
  else res.status(404).json({ message: 'User not found' });
};

// // @desc Update user avatar
// // @route PUT /api/users/avatar
// // @access Private
// export const updateAvatar =(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if (!user) {
//     res.status(404);
//     throw new Error("User not found");
//   }

//   if (req.file) {
//     // ✅ if using Cloudinary
//     const uploadRes = await cloudinary.uploader.upload(req.file.path, {
//       folder: "avatars",
//     });
//     user.avatar = uploadRes.secure_url;
//   }

//   const updatedUser = await user.save({validateBeforeSave: false});
//   res.json({
//     _id: updatedUser._id,
//     name: updatedUser.name,
//     email: updatedUser.email,
//     avatar: updatedUser.avatar,
//     token: req.token,
//   });
// });

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
    token: req.token,
  });
};
