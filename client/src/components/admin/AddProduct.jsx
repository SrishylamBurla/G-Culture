import { useState } from "react";
import { useCreateProductMutation } from "../../features/products/productApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [createProduct] = useCreateProductMutation();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    offerPrice: "",
    category: "",
    subcategory: "",
    sizes: "",
    colors: "",
    stock: "",
    images: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      sizes: form.sizes.split(",").map((s) => s.trim()),
      colors: form.colors.split(",").map((c) => c.trim()),
      images: form.images.split(",").map((img) => img.trim()),
    };

    try {
      await createProduct(payload).unwrap();
      toast.success("Product created");
      navigate("/admin/products");
    } catch (err) {
      toast.error("Failed to create product");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 space-y-6 max-w-3xl mx-auto"
      >
        <h1 className="text-xl font-semibold text-gray-800 border-b pb-2">
          Add New Product
        </h1>

        {/* GRID FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-gray-800">
              Product Name
            </label>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded text-sm border border-gray-600 text-gray-600"
            />
          </div>

          {/* SLUG */}
          <div>
            <label className="text-sm font-medium text-gray-800">
              Product Slug
            </label>
            <input
              required
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded text-sm border border-gray-600 text-gray-600"
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm font-medium text-gray-800">
              Price
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded text-sm border border-gray-600 text-gray-600"
            />
          </div>

          {/* OFFER PRICE */}
          <div>
            <label className="text-sm font-medium text-gray-800">
              Offer Price
            </label>
            <input
              name="offerPrice"
              type="number"
              value={form.offerPrice}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded text-sm border border-gray-600 text-gray-600"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm font-medium text-gray-800">
              Category
            </label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded text-sm border border-gray-600 text-gray-600"
            />
          </div>

          {/* SUBCATEGORY */}
          <div>
            <label className="text-sm font-medium text-gray-800">
              Subcategory
            </label>
            <input
              name="subcategory"
              value={form.subcategory}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded text-sm border border-gray-600 text-gray-600"
            />
          </div>

          {/* STOCK */}
          <div>
            <label className="text-sm font-medium text-gray-800">Stock</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded text-sm border border-gray-600 text-gray-600"
            />
          </div>

          {/* SIZES */}
          <div>
            <label className="text-sm font-medium text-gray-800">
              Sizes (comma separated)
            </label>
            <input
              name="sizes"
              value={form.sizes}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded text-sm border border-gray-600 text-gray-600"
            />
          </div>

          {/* COLORS */}
          <div>
            <label className="text-sm font-medium text-gray-800">
              Colors (comma separated)
            </label>
            <input
              name="colors"
              value={form.colors}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded text-sm border border-gray-600 text-gray-600"
            />
          </div>

          {/* IMAGES */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-800">
              Image URLs (comma separated)
            </label>
            <input
              name="images"
              value={form.images}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded text-sm border border-gray-600 text-gray-600"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm font-medium text-gray-800">
            Description
          </label>
          <textarea
            required
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full mt-1 border p-2 rounded text-sm border border-gray-600 text-gray-600"
          />
        </div>

        {/* BUTTON */}
        <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
          Create Product
        </button>
      </form>
    </div>
  );
}
