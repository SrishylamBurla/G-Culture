import { Link } from "react-router-dom";
import { useGetAllOrdersQuery, useCancelOrderMutation, useUpdateOrderToDeliveredMutation } 
from "../../features/order/orderApi";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function AdminOrders() {
  const { data: orders = [], isLoading } = useGetAllOrdersQuery();
  const [cancelOrder] = useCancelOrderMutation();
  const [markDelivered] = useUpdateOrderToDeliveredMutation();

  const [loadingId, setLoadingId] = useState(null);

  const handleCancel = async (id) => {
    if (!confirm("Cancel this order?")) return;

    try {
      setLoadingId(id);
      await cancelOrder(id).unwrap();
      toast.success("Order cancelled");
    } catch (err) {
      toast.error("Failed to cancel");
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelivered = async (id) => {
    try {
      setLoadingId(id);
      await markDelivered(id).unwrap();
      toast.success("Order delivered");
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-[#0e506f] h-screen">
      <h1 className="text-2xl font-bold px-4 py-2 bg-[#0e506f]">Orders</h1>

      {isLoading ? (
        <p className="px-4">Loading orders...</p>
      ) : (
        <div className="shadow bg-[#0b3a52] overflow-x-auto h-screen pb-12">
          <table className="w-full text-left">
            <thead className="sticky top-0">
              <tr className=" bg-gray-800">
                <th className="p-2">Order ID</th>
                <th className="p-2">User</th>
                <th className="p-2">Total</th>
                <th className="p-2">Paid</th>
                <th className="p-2">Delivered</th>
                <th className="p-2">Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-600">
                  <td className="p-3 font-semibold">#{order._id.slice(-6)}</td>
                  <td className="p-3">{order.user?.name || "Unknown"}</td>
                  <td className="p-3">₹{order.totalPrice}</td>

                  <td className="p-3">
                    {order.isPaid ? (
                      <span className="text-green-600 font-medium">Paid</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">Pending</span>
                    )}
                  </td>

                  <td className="p-3">
                    {order.isDelivered ? (
                      <span className="text-green-600 font-medium">Delivered</span>
                    ) : (
                      <span className="text-red-500 font-medium">Not Delivered</span>
                    )}
                  </td>

                  <td className="p-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3 space-x-3 flex">
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="text-blue-600 underline"
                    >
                      View
                    </Link>

                    {!order.isDelivered && (
                      <button
                        onClick={() => handleDelivered(order._id)}
                        className="text-green-600 underline"
                        disabled={loadingId === order._id}
                      >
                        {loadingId === order._id ? "Updating..." : "Mark Delivered"}
                      </button>
                    )}

                    {!order.isCancelled && (
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="text-red-500 underline"
                        disabled={loadingId === order._id}
                      >
                        {loadingId === order._id ? "Cancelling..." : "Cancel"}
                      </button>
                    )}
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
