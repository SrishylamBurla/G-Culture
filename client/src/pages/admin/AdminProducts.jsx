import { Link } from "react-router-dom";
import { useGetAllProductsQuery, useDeleteProductMutation } from "../../features/products/productApi";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function AdminProducts() {
  const { data: products = [], isLoading } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      setDeletingId(id);
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Failed to delete product");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-[#0e506f] h-screen">
      <div className="flex justify-between px-4 py-2 bg-[#0e506f]">
        <h1 className="text-2xl font-bold">Products</h1>

        <Link
          to="/admin/products/add"
          className="px-2 py-1 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
        >
          + Add Product
        </Link>
      </div>

      {isLoading ? (
        <p className="px-4">Loading products...</p>
      ) : (
        <div className="overflow-y-auto h-screen bg-[#0b3a52] shadow pb-12">
          <table className="w-full text-left">
            <thead className="bg-gray-800 sticky top-0">
              <tr className="">
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">Category</th>
                <th className="p-2">Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-600">
                  <td className="p-2">
                    <img
                      src={product.images?.[0]}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="p-2 font-medium">{product.name}</td>

                  <td className="p-2 capitalize">{product.category}</td>

                  <td className="p-2">₹{product.offerPrice || product.price}</td>

                  <td className="p-2 flex gap-3">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:underline"
                      disabled={deletingId === product._id}
                    >
                      {deletingId === product._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

