import express from 'express';
import { createOrder, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', protect, createOrder);
router.get('/:id', protect, getOrderById);
router.post('/razorpay', protect);

export default router;
