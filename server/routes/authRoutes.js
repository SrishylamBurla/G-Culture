import express from 'express';
import { register, login, getProfile, updateAvatar } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put("/avatar", protect, upload.single("avatar"), updateAvatar);

export default router;
