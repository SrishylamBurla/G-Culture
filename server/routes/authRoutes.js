import express from "express";
import {
  register,
  login,
  getProfile,
  updateAvatar,
  updateName,
  updatePassword,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  createUser,
  toggleAdmin
} from "../controllers/authController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.route("/").get(protect, admin, getUsers);
router.route("/").post(protect, admin, createUser)

router.put("/update-avatar", protect, upload.single("avatar"), updateAvatar);
router.put("/update-name", protect, updateName);
router.put("/update-password", protect, updatePassword);

router.route("/:id/make-admin")
  .put(protect, admin, toggleAdmin);

router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
