import crypto from "crypto";
import Razorpay from "razorpay";
import Order from "../models/Order.js";


const razorpay = new Razorpay({
  key_id:
    process.env.RAZORPAY_KEY_ID,

  key_secret:
    process.env.RAZORPAY_KEY_SECRET,
});


/*
=========================================================
CREATE RAZORPAY ORDER
=========================================================
*/

export const createRazorpayOrder =
  async (req, res) => {
    try {
      const {
        orderId,
      } = req.body;


      if (!orderId) {
        return res.status(400).json({
          message:
            "Order ID is required",
        });
      }


      /*
      ================================================
      FIND OUR MONGODB ORDER
      ================================================
      */

      const order =
        await Order.findOne({
          _id: orderId,
          user: req.user._id,
        });


      if (!order) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }


      /*
      ================================================
      VALIDATE ORDER
      ================================================
      */

      if (order.isCancelled) {
        return res.status(400).json({
          message:
            "Cancelled orders cannot be paid",
        });
      }


      if (order.isPaid) {
        return res.status(400).json({
          message:
            "Order is already paid",
        });
      }


      if (
        order.paymentMethod !==
        "RAZORPAY"
      ) {
        return res.status(400).json({
          message:
            "This order is not a Razorpay order",
        });
      }


      /*
      ================================================
      CREATE RAZORPAY ORDER
      ================================================
      
      ₹100 = 10000 paise
      */

      const razorpayOrder =
        await razorpay.orders.create({
          amount:
            Math.round(
              order.totalPrice * 100
            ),

          currency: "INR",

          receipt:
            `gculture_${order._id}`,

          notes: {
            gcultureOrderId:
              order._id.toString(),

            userId:
              req.user._id.toString(),
          },
        });


      /*
      ================================================
      SAVE RAZORPAY ORDER ID
      ================================================
      */

      order.paymentResult = {
        razorpayOrderId:
          razorpayOrder.id,
      };

      await order.save();


      res.status(200).json({
        success: true,

        orderId:
          razorpayOrder.id,

        amount:
          razorpayOrder.amount,

        currency:
          razorpayOrder.currency,

        keyId:
          process.env.RAZORPAY_KEY_ID,
      });

    } catch (error) {
      console.error(
        "RAZORPAY ORDER ERROR:",
        error
      );

      res.status(500).json({
        message:
          error?.error?.description ||
          "Razorpay order creation failed",
      });
    }
  };


/*
=========================================================
VERIFY RAZORPAY PAYMENT
=========================================================
*/

export const verifyRazorpayPayment =
  async (req, res) => {
    try {
      const {
        orderId,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      } = req.body;


      if (
        !orderId ||
        !razorpay_payment_id ||
        !razorpay_order_id ||
        !razorpay_signature
      ) {
        return res.status(400).json({
          message:
            "Incomplete payment details",
        });
      }


      /*
      ================================================
      FIND OUR ORDER
      ================================================
      */

      const order =
        await Order.findOne({
          _id: orderId,
          user: req.user._id,
        });


      if (!order) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }


      /*
      ================================================
      ALREADY PAID
      ================================================
      */

      if (order.isPaid) {
        return res.status(200).json({
          success: true,

          message:
            "Payment already verified",

          order,
        });
      }


      /*
      ================================================
      GET SERVER-STORED RAZORPAY ORDER ID
      ================================================
      
      IMPORTANT:
      Do NOT trust razorpay_order_id from
      the browser for signature verification.
      */

      const storedRazorpayOrderId =
        order.paymentResult
          ?.razorpayOrderId;


      if (!storedRazorpayOrderId) {
        return res.status(400).json({
          message:
            "Razorpay order ID not found",
        });
      }


      /*
      ================================================
      MAKE SURE CALLBACK MATCHES OUR ORDER
      ================================================
      */

      if (
        storedRazorpayOrderId !==
        razorpay_order_id
      ) {
        return res.status(400).json({
          message:
            "Invalid Razorpay order",
        });
      }


      /*
      ================================================
      GENERATE SIGNATURE
      ================================================
      */

      const generatedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_KEY_SECRET
          )
          .update(
            `${storedRazorpayOrderId}|${razorpay_payment_id}`
          )
          .digest("hex");


      /*
      ================================================
      TIMING-SAFE COMPARISON
      ================================================
      */

      const generatedBuffer =
        Buffer.from(
          generatedSignature,
          "utf8"
        );

      const receivedBuffer =
        Buffer.from(
          razorpay_signature,
          "utf8"
        );


      if (
        generatedBuffer.length !==
          receivedBuffer.length ||
        !crypto.timingSafeEqual(
          generatedBuffer,
          receivedBuffer
        )
      ) {
        return res.status(400).json({
          message:
            "Payment verification failed",
        });
      }


      /*
      ================================================
      PAYMENT VERIFIED
      ================================================
      */

      order.isPaid = true;

      order.paidAt =
        new Date();

      order.paymentResult = {
        razorpayOrderId:
          storedRazorpayOrderId,

        razorpayPaymentId:
          razorpay_payment_id,

        razorpaySignature:
          razorpay_signature,
      };


      const updatedOrder =
        await order.save();


      res.status(200).json({
        success: true,

        message:
          "Payment verified successfully",

        order:
          updatedOrder,
      });

    } catch (error) {
      console.error(
        "RAZORPAY VERIFY ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Payment verification failed",
      });
    }
  };