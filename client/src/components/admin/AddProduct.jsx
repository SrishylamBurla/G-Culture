import { useState } from "react";
import { useCreateProductMutation } from "../../features/products/productApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [createProduct] = useCreateProductMutation();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    offerPrice: "",
    category: "",
    subcategory: "",
    brand: "",
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
    <form onSubmit={handleSubmit} className="space-y-4 p-6 shadow bg-[#0b3a52]">

      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      <input required name="name" placeholder="Product Name"
             value={form.name} onChange={handleChange}
             className="w-full border p-2 rounded" />

      <textarea required name="description" placeholder="Description"
                value={form.description} onChange={handleChange}
                className="w-full border p-2 rounded" />

      <input name="price" placeholder="Regular Price"
             value={form.price} onChange={handleChange}
             className="w-full border p-2 rounded" />

      <input name="offerPrice" placeholder="Offer Price"
             value={form.offerPrice} onChange={handleChange}
             className="w-full border p-2 rounded" />

      <input name="category" placeholder="Category"
             value={form.category} onChange={handleChange}
             className="w-full border p-2 rounded" />

      <input name="subcategory" placeholder="Subcategory"
             value={form.subcategory} onChange={handleChange}
             className="w-full border p-2 rounded" />

      <input name="brand" placeholder="Brand"
             value={form.brand} onChange={handleChange}
             className="w-full border p-2 rounded" />

      <input name="stock" placeholder="Stock Count"
             value={form.stock} onChange={handleChange}
             className="w-full border p-2 rounded" />

      <input name="sizes" placeholder="Sizes (comma separated)"
             value={form.sizes} onChange={handleChange}
             className="w-full border p-2 rounded" />

      <input name="colors" placeholder="Colors (comma separated)"
             value={form.colors} onChange={handleChange}
             className="w-full border p-2 rounded" />

      <input name="images" placeholder="Image URLs (comma separated)"
             value={form.images} onChange={handleChange}
             className="w-full border p-2 rounded" />

      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Create Product
      </button>

    </form>
  );
}
