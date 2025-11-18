import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
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
    res.status(500).json({ message: err.message });
  }
};

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
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
};

export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const created = await product.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    Object.assign(product, req.body);
    const updated = await product.save();
    res.json(updated);
  } else res.status(404).json({ message: "Product not found" });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else res.status(404).json({ message: "Product not found" });
};

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    const regex = new RegExp(query, "i");

    let filters = {
      $or: [
        { name: regex },
        { subcategory: regex },
        { colors: { $in: [regex] } }
      ],
    };

    if (query.toLowerCase().includes("streetwear")) filters = { category: "streetwear" };
    if (query.toLowerCase().includes("casualwear")) filters = { category: "casualwear" };
    if (query.toLowerCase().includes("caps")) filters = { category: "caps" };
    if (query.toLowerCase().includes("chestbags")) filters = { category: "chestbags" };

    const results = await Product.find(filters).limit(30);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};
