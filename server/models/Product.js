import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number },
    offerPercentage: { type: Number },
    category: { type: String },
    subcategory: { type: String },
    description: { type: String },
    sizes: [String],
    colors: [String],
    images: [String],
    countInStock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     slug: { type: String, required: true, unique: true },
//     price: { type: Number, required: true },
//     offerPrice: { type: Number },
//     offerPercentage: { type: Number },
//     category: { type: String, required: true },
//     subcategory: { type: String },
//     description: { type: String },
//     sizes: [{ type: String }],
//     colors: [{ type: String }],
//     images: [{ type: String }],
//     countInStock: { type: Number, default: 0 },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);

// export default Product;
