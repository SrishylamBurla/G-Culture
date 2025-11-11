import Order from '../models/Order.js';
// import Razorpay from 'razorpay';

export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) return res.status(400).json({ message: 'No order items' });
  const order = new Order({ user: req.user._id, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice });
  const created = await order.save();
  res.status(201).json(created);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) res.json(order);
  else res.status(404).json({ message: 'Order not found' });
};

// export const createRazorpayOrder = async (req, res) => {
//   const { amount, currency = 'INR' } = req.body; // amount in paise
//   const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
//   const options = { amount: amount, currency };
//   try {
//     const order = await instance.orders.create(options);
//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ message: 'Razorpay order creation failed' });
//   }
// };
