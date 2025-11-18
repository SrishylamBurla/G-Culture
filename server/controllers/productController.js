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
    
    const queryRaw = req.query.query || req.query.q;
if (!queryRaw) return res.json([]);

const query = queryRaw.toLowerCase().trim().replace(/-/g, " ").replace(/_/g, " ");
const words = query.split(/\s+/);


    let filter = { $and: [] };

    // -----------------------------------------
    // Synonyms
    // -----------------------------------------
    const synonyms = {
      shirt: ["shirt", "shirts", "formal shirt", "casual shirt"],
      tshirt: ["tshirt", "t-shirt", "tees", "tee", "tshirts"],
      jeans: ["jeans", "denim", "denim jeans"],
      jacket: ["jacket", "hoodie", "outerwear"],
      dress: ["dress", "dresses", "frock"],
      skirt: ["skirt", "long skirt"],
      shoes: ["shoes", "sneakers", "sports shoes"],
      caps: ["cap", "caps", "hats"],
      kids: ["kids", "kid", "child", "children"],
    };

    // -----------------------------------------
    // Reverse search synonyms
    // -----------------------------------------
    const matchSynonyms = (word) => {
      for (const key in synonyms) {
        if (synonyms[key].includes(word)) return key;
      }
      return null;
    };

    // -----------------------------------------
    // Map synonyms → categories + subcategories
    // -----------------------------------------
    const categoryMap = {
      shirt: { subcategory: "shirts" },
      tshirt: { subcategory: "tops" },
      jeans: { subcategory: "bottoms" },
      jacket: { subcategory: "outerwear" },
      dress: { subcategory: "dresses" },
      skirt: { subcategory: "bottoms" },
      shoes: { subcategory: "casual" },
      caps: { category: "caps" },  
      kids: { category: "caps" },
    };

    // -----------------------------------------
    // Build filter
    // -----------------------------------------
    for (const word of words) {
      const synonymKey = matchSynonyms(word);

      // 🔥 Word matches synonym → apply mapped category filter
      if (synonymKey && categoryMap[synonymKey]) {
        filter.$and.push(categoryMap[synonymKey]);
        continue;
      }

      // 🔢 If keyword is numeric → maybe searching size
      if (!isNaN(word)) {
        filter.$and.push({ sizes: word });
        continue;
      }

      // 🔍 General text search
      filter.$and.push({
        $or: [
          { name: { $regex: word, $options: "i" } },
          { slug: { $regex: word, $options: "i" } },
          { description: { $regex: word, $options: "i" } },
          { colors: { $elemMatch: { $regex: word, $options: "i" } } },
          { subcategory: { $regex: word, $options: "i" } },
        ],
      });
    }

    // If no conditions → return empty
    if (filter.$and.length === 0) filter = {};

    // -----------------------------------------
    // Execute search
    // -----------------------------------------
    let results = await Product.find(filter).lean();

    // -----------------------------------------
    // Sort by relevance score
    // -----------------------------------------
    results = results.sort((a, b) => {
      const scoreA = words.filter((w) =>
        a.name.toLowerCase().includes(w)
      ).length;
      const scoreB = words.filter((w) =>
        b.name.toLowerCase().includes(w)
      ).length;
      return scoreB - scoreA;
    });

    res.json(results.slice(0, 40));
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};
