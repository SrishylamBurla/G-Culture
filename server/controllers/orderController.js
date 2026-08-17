import Order from "../models/Order.js";
import Product from "../models/Product.js";


/*
=========================================================
CREATE ORDER
=========================================================
*/

export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
    } = req.body;

    if (
      !orderItems ||
      orderItems.length === 0
    ) {
      return res.status(400).json({
        message: "No order items",
      });
    }

    if (
      !shippingAddress?.address?.trim()
    ) {
      return res.status(400).json({
        message: "Shipping address is required",
      });
    }

    if (
      !["COD", "RAZORPAY"].includes(
        paymentMethod
      )
    ) {
      return res.status(400).json({
        message: "Invalid payment method",
      });
    }


    /*
    =====================================================
    BUILD ORDER ITEMS FROM DATABASE
    =====================================================
    */

    const verifiedOrderItems = [];

    let itemsPrice = 0;


    for (const item of orderItems) {
      const productId =
        item.product;

      const product =
        await Product.findById(
          productId
        );

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${productId}`,
        });
      }


      /*
      ================================================
      CHECK STOCK
      ================================================
      */

      const quantity =
        Number(item.qty) || 1;

      if (quantity <= 0) {
        return res.status(400).json({
          message: `Invalid quantity for ${product.name}`,
        });
      }

      if (
        Number(product.countInStock) <
        quantity
      ) {
        return res.status(400).json({
          message: `${product.name} does not have enough stock`,
        });
      }


      /*
      ================================================
      DETERMINE REAL PRICE
      ================================================
      */

      const regularPrice =
        Number(product.price) || 0;

      const offerPrice =
        Number(product.offerPrice) || 0;

      const actualPrice =
        offerPrice > 0 &&
        offerPrice < regularPrice
          ? offerPrice
          : regularPrice;


      /*
      ================================================
      CREATE VERIFIED ITEM
      ================================================
      */

      const verifiedItem = {
        product: product._id,
        name: product.name,
        qty: quantity,
        price: actualPrice,
        image:
          product.images?.[0] ||
          "",
        selectedSize:
          item.selectedSize || "",
        selectedColor:
          item.selectedColor || "",
      };

      verifiedOrderItems.push(
        verifiedItem
      );

      itemsPrice +=
        actualPrice * quantity;
    }


    /*
    =====================================================
    TAX
    =====================================================
    */

    const taxPrice = 0;


    /*
    =====================================================
    SHIPPING
    =====================================================
    */

    const shippingPrice = 0;


    /*
    =====================================================
    FINAL SERVER-CALCULATED TOTAL
    =====================================================
    */

    const totalPrice =
      itemsPrice +
      taxPrice +
      shippingPrice;


    /*
    =====================================================
    CREATE ORDER
    =====================================================
    */

    const order = new Order({
      user: req.user._id,

      orderItems:
        verifiedOrderItems,

      shippingAddress,

      paymentMethod,

      itemsPrice,

      taxPrice,

      shippingPrice,

      totalPrice,

      isPaid: false,

      isDelivered: false,

      isCancelled: false,
    });


    const createdOrder =
      await order.save();


    /*
    =====================================================
    OPTIONAL: REDUCE STOCK
    =====================================================
    
    I recommend doing this after payment rather than
    immediately if you want inventory to remain available
    while a customer abandons checkout.
    
    For now we DO NOT reduce stock here.
    */


    res.status(201).json(
      createdOrder
    );

  } catch (error) {
    console.error(
      "CREATE ORDER ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to create order",
    });
  }
};


/*
=========================================================
GET ORDER BY ID
=========================================================
*/

export const getOrderById = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      ).populate(
        "user",
        "name email"
      );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }


    /*
    =====================================================
    SECURITY
    =====================================================
    
    Customer can only see their own order.
    Admin can see any order.
    */

    const isOwner =
      order.user._id.toString() ===
      req.user._id.toString();

    if (
      !isOwner &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }


    res.json(order);

  } catch (error) {
    console.error(
      "GET ORDER ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch order",
    });
  }
};


/*
=========================================================
GET MY ORDERS
=========================================================
*/

export const getMyOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });

    res.json(orders);

  } catch (error) {
    console.error(
      "GET MY ORDERS ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch user orders",
    });
  }
};


/*
=========================================================
GET ALL ORDERS
=========================================================
*/

export const getAllOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find()
        .populate(
          "user",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    res.json(orders);

  } catch (error) {
    console.error(
      "GET ALL ORDERS ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch all orders",
    });
  }
};


/*
=========================================================
UPDATE ORDER TO PAID
=========================================================
*/

export const updateOrderToPaid =
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }


      /*
      ================================================
      AUTHORIZATION
      ================================================
      */

      if (
        order.user.toString() !==
          req.user._id.toString() &&
        !req.user.isAdmin
      ) {
        return res.status(403).json({
          message:
            "Not authorized",
        });
      }


      /*
      ================================================
      DO NOT ALLOW RANDOM CLIENT-SIDE PAYMENT
      ================================================
      */

      if (
        order.paymentMethod ===
        "RAZORPAY"
      ) {
        return res.status(400).json({
          message:
            "Razorpay payments must be verified through the payment verification endpoint",
        });
      }


      order.isPaid = true;

      order.paidAt =
        new Date();

      order.paymentResult =
        req.body;


      const updatedOrder =
        await order.save();

      res.json(
        updatedOrder
      );

    } catch (error) {
      console.error(
        "UPDATE PAID ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Failed to update order to paid",
      });
    }
  };


/*
=========================================================
UPDATE ORDER TO DELIVERED
=========================================================
*/

export const updateOrderToDelivered =
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }

      order.isDelivered =
        true;

      order.deliveredAt =
        new Date();

      const updatedOrder =
        await order.save();

      res.json(
        updatedOrder
      );

    } catch (error) {
      console.error(
        "DELIVER ORDER ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Failed to mark delivered",
      });
    }
  };


/*
=========================================================
CANCEL ORDER
=========================================================
*/

export const cancelOrder = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {
      return res.status(404).json({
        message:
          "Order not found",
      });
    }


    if (
      order.user.toString() !==
        req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({
        message:
          "Not authorized to cancel this order",
      });
    }


    if (order.isPaid) {
      return res.status(400).json({
        message:
          "Paid orders cannot be cancelled directly. Refund is required.",
      });
    }


    if (order.isCancelled) {
      return res.status(400).json({
        message:
          "Order is already cancelled",
      });
    }


    order.isCancelled = true;

    order.cancelledAt =
      new Date();


    const updatedOrder =
      await order.save();

    res.json(
      updatedOrder
    );

  } catch (error) {
    console.error(
      "CANCEL ORDER ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to cancel order",
    });
  }
};