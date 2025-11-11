// import Product from '../models/Product.js';

// export const getProducts = async (req, res) => {
//   const products = await Product.find({});
//   // console.log("Products from DB:", products);
//   res.json(products);
// };

// export const getProductsByCategory = async (req, res) => {
//   try {
//     const { category, color, size, price } = req.query;
//     const filter = {};

//     if (category) filter.category = category;
//     if (color) filter.color = color;
//     if (size) filter.size = size;
//     if (price) filter.price = { $lte: Number(price) };

//     const products = await Product.find(filter);
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// export const getProductById = async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) res.json(product);
//   else res.status(404).json({ message: 'Product not found' });
// };

// // export const createProduct = async (req, res) => {
// //   const product = new Product(req.body);
// //   const created = await product.save();
// //   res.status(201).json(created);
// // };

// export const createProduct = async (req, res) => {
//   console.log("Incoming Product Data:", req.body);
//   try {
//     const product = new Product(req.body);
//     const created = await product.save();
//     res.status(201).json(created);
//   } catch (error) {
//     console.error("Validation Error:", error);
//     res.status(400).json({ message: error.message });
//   }
// };


// export const updateProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     Object.assign(product, req.body);
//     const updated = await product.save();
//     res.json(updated);
//   } else res.status(404).json({ message: 'Product not found' });
// };

// export const deleteProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     await product.remove();
//     res.json({ message: 'Product removed' });
//   } else res.status(404).json({ message: 'Product not found' });
// };

// export const searchProducts = async (req, res) => {
//   try {
//     const { query } = req.query;
//     if (!query) return res.json([]);

//     const regex = new RegExp(query, "i"); // case-insensitive

//     // 🧠 Smarter search logic
//     let filters = {
//       $or: [
//         { name: regex },
//         { subcategory: regex },
//         { colors: { $in: [regex] } },
//       ],
//     };

//     // 👕 Handle category-level searches separately
//     if (query.toLowerCase() === "men" || query.toLowerCase() === "men's") {
//       filters = { category: "men" };
//     } else if (
//       query.toLowerCase() === "women" ||
//       query.toLowerCase() === "women's"
//     ) {
//       filters = { category: "women" };
//     } else if (query.toLowerCase() === "kids" || query.toLowerCase() === "kid") {
//       filters = { category: "kids" };
//     } else if (query.toLowerCase() === "footwear" || query.toLowerCase() === "shoes") {
//       filters = { category: "footwear" };
//     }

//     const results = await Product.find(filters).limit(30);

//     res.json(results);
//   } catch (err) {
//     console.error("Search error:", err);
//     res.status(500).json({ message: "Search failed" });
//   }
// }

import Product from "../models/Product.js";

// ✅ Generic route for fetching all products with optional filters
export const getProducts = async (req, res) => {
  try {
    const { category, subcategory, color, size, price } = req.query;
    const filter = {};

    // 🔒 Always restrict by category if provided
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;

    // 🎨 Match color in array field
    if (color)
      filter.colors = { $elemMatch: { $regex: new RegExp(color, "i") } };

    // 📏 Match size in array field
    if (size)
      filter.sizes = { $elemMatch: { $regex: new RegExp(size, "i") } };

    // 💰 Match price <= given value
    if (price) filter.price = { $lte: Number(price) };

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Route for fetching by category (used by category pages)
export const getProductsByCategory = async (req, res) => {
  try {
    const { category, subcategory, color, size, price } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;

    if (color)
      filter.colors = { $elemMatch: { $regex: new RegExp(color, "i") } };

    if (size)
      filter.sizes = { $elemMatch: { $regex: new RegExp(size, "i") } };

    if (price) filter.price = { $lte: Number(price) };

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    console.error("❌ Filter error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single product
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
};

// ✅ Create new product
export const createProduct = async (req, res) => {
  console.log("Incoming Product Data:", req.body);
  try {
    const product = new Product(req.body);
    const created = await product.save();
    res.status(201).json(created);
  } catch (error) {
    console.error("Validation Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// ✅ Update product
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    Object.assign(product, req.body);
    const updated = await product.save();
    res.json(updated);
  } else res.status(404).json({ message: "Product not found" });
};

// ✅ Delete product
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else res.status(404).json({ message: "Product not found" });
};

// ✅ Search products
export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    const regex = new RegExp(query, "i");

    let filters = {
      $or: [
        { name: regex },
        { subcategory: regex },
        { colors: { $in: [regex] } },
      ],
    };

    // Updated for new categories
    if (query.toLowerCase().includes("streetwear")) filters = { category: "streetwear" };
    if (query.toLowerCase().includes("casualwear")) filters = { category: "casualwear" };
    if (query.toLowerCase().includes("caps")) filters = { category: "caps" };
    if (query.toLowerCase().includes("chestbags")) filters = { category: "chestbags" };

    const results = await Product.find(filters).limit(30);
    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed" });
  }
};





// import Product from "../models/Product.js";

// // ✅ Generic, flexible route for all filters (used by MenPage, WomenPage, etc.)
// export const getProducts = async (req, res) => {
//   try {
//     const { category, subcategory, color, size, price } = req.query;
//     const filter = {};

//     // 🔒 Keep category filter strong
//     if (category) filter.category = category;
//      if (subcategory) filter.subcategory = subcategory;
//     if (color) filter.color = color;
//     if (size) filter.size = size;

//     // 🪙 Support price slider: return products less than or equal to selected price
//     if (price) filter.price = { $lte: Number(price) };

//     const products = await Product.find(filter);

//     res.json(products);
//   } catch (err) {
//     console.error("❌ Error fetching products:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getProductsByCategory = async (req, res) => {
//   try {
//     const { category, subcategory, color, size, price } = req.query;
//     const filter = {};

//     if (category) filter.category = category;
//     if (subcategory) filter.subcategory = subcategory;

//     // 👕 For colors: match any item that contains that color in its colors array
//     if (color) filter.colors = { $elemMatch: { $regex: new RegExp(color, "i") } };

//     // 📏 For sizes: match any product that includes the selected size
//     if (size) filter.sizes = { $elemMatch: { $regex: new RegExp(size, "i") } };

//     // 💰 Price (less than or equal)
//     if (price) filter.price = { $lte: Number(price) };

//     const products = await Product.find(filter);
//     res.json(products);
//   } catch (err) {
//     console.error("❌ Filter error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };



// export const getProductById = async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) res.json(product);
//   else res.status(404).json({ message: "Product not found" });
// };

// export const createProduct = async (req, res) => {
//   console.log("Incoming Product Data:", req.body);
//   try {
//     const product = new Product(req.body);
//     const created = await product.save();
//     res.status(201).json(created);
//   } catch (error) {
//     console.error("Validation Error:", error);
//     res.status(400).json({ message: error.message });
//   }
// };

// export const updateProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     Object.assign(product, req.body);
//     const updated = await product.save();
//     res.json(updated);
//   } else res.status(404).json({ message: "Product not found" });
// };

// export const deleteProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     await product.remove();
//     res.json({ message: "Product removed" });
//   } else res.status(404).json({ message: "Product not found" });
// };

// export const searchProducts = async (req, res) => {
//   try {
//     const { query } = req.query;
//     if (!query) return res.json([]);

//     const regex = new RegExp(query, "i");

//     let filters = {
//       $or: [
//         { name: regex },
//         { subcategory: regex },
//         { colors: { $in: [regex] } },
//       ],
//     };

//     if (query.toLowerCase() === "men" || query.toLowerCase() === "men's") {
//       filters = { category: "men" };
//     } else if (
//       query.toLowerCase() === "women" ||
//       query.toLowerCase() === "women's"
//     ) {
//       filters = { category: "women" };
//     } else if (
//       query.toLowerCase() === "kids" ||
//       query.toLowerCase() === "kid"
//     ) {
//       filters = { category: "kids" };
//     } else if (
//       query.toLowerCase() === "footwear" ||
//       query.toLowerCase() === "shoes"
//     ) {
//       filters = { category: "footwear" };
//     }

//     const results = await Product.find(filters).limit(30);
//     res.json(results);
//   } catch (err) {
//     console.error("Search error:", err);
//     res.status(500).json({ message: "Search failed" });
//   }
// };
