// import { useParams, useNavigate } from "react-router-dom";
// import {
//   useGetProductByIdQuery,
//   useUpdateProductMutation,
// } from "../../features/products/productApi";
// import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";

// export default function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data: product } = useGetProductByIdQuery(id);
//   const [updateProduct] = useUpdateProductMutation();

//   const [form, setForm] = useState(null);

//   useEffect(() => {
//     if (product) {
//       setForm({
//         name: product.name,
//         slug: product.slug,
//         description: product.description,
//         price: product.price,
//         offerPrice: product.offerPrice,
//         category: product.category,
//         subcategory: product.subcategory,
//         stock: product.stock,
//         sizes: product.sizes?.join(", ") || "",
//         colors: product.colors?.join(", ") || "",
//         images: product.images?.join(", ") || "",
//       });
//     }
//   }, [product]);

//   if (!form) return <p>Loading...</p>;

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       ...form,
//       sizes: form.sizes.split(",").map((s) => s.trim()),
//       colors: form.colors.split(",").map((c) => c.trim()),
//       images: form.images.split(",").map((img) => img.trim()),
//     };

//     try {
//       await updateProduct({ id, data: payload }).unwrap();
//       toast.success("Product updated");
//       navigate("/admin/products");
//     } catch (err) {
//       toast.error("Failed to update");
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 bg-[#0b3a52] p-6 shadow">
//       <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

//       <input
//         name="name"
//         value={form.name}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         name="slug"
//         value={form.slug}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       />
//       <textarea
//         name="description"
//         value={form.description}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         name="price"
//         value={form.price}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         name="offerPrice"
//         value={form.offerPrice}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         name="category"
//         value={form.category}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         name="subcategory"
//         value={form.subcategory}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         name="stock"
//         value={form.stock}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         name="sizes"
//         value={form.sizes}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         name="colors"
//         value={form.colors}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       />
//       <input
//         name="images"
//         value={form.images}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       />

//       <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//         Save Changes
//       </button>
//     </form>
//   );
// }


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
        name: product.name || "",
        slug: product.slug || "",
        description: product.description || "",
        price: product.price || "",
        offerPrice: product.offerPrice || "",
        category: product.category || "",
        subcategory: product.subcategory || "",
        stock: product.stock || "",
        sizes: product.sizes?.join(", ") || "",
        colors: product.colors?.join(", ") || "",
        images: product.images?.join(", ") || "",
      });
    }
  }, [product]);

  if (!form) return <p className="text-white p-4">Loading...</p>;

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
      await updateProduct({ id, updates: payload }).unwrap();
      toast.success("Product updated");
      navigate("/admin/products");
    } catch (err) {
      toast.error("Failed to update");
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
          Edit Product
        </h1>

        {/* GRID / FORM FIELDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-gray-800">
              Product Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded text-sm border border-gray-600 text-gray-600"
            />
          </div>

          {/* SLUG */}
          <div>
            <label className="text-sm font-medium text-gray-800">Slug</label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded text-sm border border-gray-600 text-gray-600"
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm font-medium text-gray-800">Price</label>
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
              Images (URLs comma separated)
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
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full mt-1 border p-2 rounded text-sm border border-gray-600 text-gray-600"
          />
        </div>

        {/* BUTTON */}
        <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
          Save Changes
        </button>
      </form>
    </div>
  );
}
