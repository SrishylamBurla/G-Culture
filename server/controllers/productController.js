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
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Merge changes
    for (let key in req.body) {
      product[key] = req.body[key];
    }

    // Save updated product
    const updatedProduct = await product.save();

    res.json(updatedProduct);

  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// export const updateProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     Object.assign(product, req.body);
//     const updated = await product.save();
//     res.json(updated);
//   } else res.status(404).json({ message: "Product not found" });
// };

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product removed successfully" });

  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const searchProducts = async (req, res) => {
  try {
    // Disable caching (VERY IMPORTANT)
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");

    const { query } = req.query;
    if (!query) return res.json([]);

    const q = query.toLowerCase().trim();
    const words = q.split(/\s+/);

    // 🚀 AMAZON-LIKE synonym dictionary (UPGRADED)
    const synonyms = {
      men: ["men", "male", "man", "mens"],
      women: ["women", "woman", "female", "ladies", "lady"],
      shirt: ["shirt", "shirts", "formal shirt", "casual shirt"],
      tshirt: ["tshirt", "t-shirt", "tee", "tees", "tshirts"],
      jeans: ["jeans", "denim", "denims", "jean"],
      jacket: ["jacket", "hoodie", "outerwear", "sweatshirt"],
      dress: ["dress", "dresses", "frock"],
      skirt: ["skirt", "long skirt"],
      shoes: ["shoes", "sneakers", "sports shoes", "footwear"],
      kids: ["kids", "child", "children", "kid"]
    };

    const matchSynonym = (word) => {
      word = word.toLowerCase();
      for (const key in synonyms) {
        if (synonyms[key].includes(word)) return key;
      }
      return null;
    };

    // 🚀 MAP synonyms → exact category/subcategory in DB
    const categoryMap = {
      men: { category: "streetwear" },
      women: { category: "casualwear" },
      kids: { category: "caps" },
      shirt: { subcategory: "shirts" },
      tshirt: { subcategory: "tops" },
      jeans: { subcategory: "bottoms" },
      jacket: { subcategory: "outerwear" },
      dress: { subcategory: "dresses" },
      skirt: { subcategory: "bottoms" },
      shoes: { subcategory: "casual" }
    };

    // 🚀 QUERY BUILDER
    let filter = { $and: [] };

    for (let word of words) {
      const syn = matchSynonym(word);

      // Use synonym mapped category if exists
      if (syn && categoryMap[syn]) {
        filter.$and.push(categoryMap[syn]);
        continue;
      }

      // Try fuzzy/typo-tolerant regex for fallback
      const fuzzy = new RegExp(word.split("").join(".*"), "i");

      filter.$and.push({
        $or: [
          { name: { $regex: fuzzy } },
          { subcategory: { $regex: fuzzy } },
          { colors: { $elemMatch: { $regex: fuzzy } } }
        ]
      });
    }

    if (filter.$and.length === 0) filter = {};

    // 🚀 Fetch from DB
    let results = await Product.find(filter);

    // 🚀 INTELLIGENT SCORING & SORTING (like Amazon relevance)
    results = results
      .map((p) => {
        let score = 0;

        words.forEach((w) => {
          const lw = w.toLowerCase();
          if (p.name.toLowerCase().includes(lw)) score += 5;
          if (p.subcategory?.toLowerCase().includes(lw)) score += 3;
          if (p.category?.toLowerCase().includes(lw)) score += 2;

          // Boost exact synonym matches
          const syn = matchSynonym(w);
          if (syn && categoryMap[syn]?.subcategory === p.subcategory) {
            score += 10;
          }
        });

        return { product: p, score };
      })
      .sort((a, b) => b.score - a.score)
      .map((x) => x.product);

    return res.json(results.slice(0, 40));
  } catch (err) {
    console.error("Search failed:", err);
    res.status(500).json({ message: "Search failed" });
  }
};