import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },       
    rating: { type: Number, required: true },      
    comment: { type: String, required: true },    
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

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
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    brand: { type: String },
    sizes: [String],
    colors: [String],
    images: [String],
    countInStock: { type: Number, default: 0 },

    reviews: [reviewSchema],

    numReviews: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
