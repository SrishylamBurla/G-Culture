import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
  getFeaturedProducts,
  getLatestProducts
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/category", getProductsByCategory);
router.get("/featured", getFeaturedProducts);
router.get("/:id", getProductById);
router.get("/latest", getLatestProducts);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;

