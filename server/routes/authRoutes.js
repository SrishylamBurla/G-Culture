import express from 'express';
import { register, login, getProfile, updateAvatar, updateName, updatePassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put("/update-avatar", protect, upload.single("avatar"), updateAvatar);
router.put("/update-name", protect, updateName)
router.put("/update-password", protect, updatePassword)


export default router;
