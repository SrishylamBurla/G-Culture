import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../features/products/productApi";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product } = useGetProductByIdQuery(id);
  const [updateProduct] = useUpdateProductMutation();

  const [form, setForm] = useState(null);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        offerPrice: product.offerPrice,
        category: product.category,
        subcategory: product.subcategory,
        stock: product.stock,
        sizes: product.sizes.join(", "),
        colors: product.colors.join(", "),
        images: product.images.join(", "),
      });
    }
  }, [product]);

  if (!form) return <p>Loading...</p>;

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
      await updateProduct({ id, data: payload }).unwrap();
      toast.success("Product updated");
      navigate("/admin/products");
    } catch (err) {
      toast.error("Failed to update");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-[#0b3a52] p-6 shadow">

      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <input name="name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="slug" value={form.slug} onChange={handleChange} className="w-full border p-2 rounded" />
      <textarea name="description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="price" value={form.price} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="offerPrice" value={form.offerPrice} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="category" value={form.category} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="subcategory" value={form.subcategory} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="stock" value={form.stock} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="sizes" value={form.sizes} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="colors" value={form.colors} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="images" value={form.images} onChange={handleChange} className="w-full border p-2 rounded" />

      <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Save Changes
      </button>
    </form>
  );
}
