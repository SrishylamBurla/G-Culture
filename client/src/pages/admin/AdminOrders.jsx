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
    <div className="">
      <h1 className="text-2xl font-bold p-2 bg-[#0e506f]">Orders</h1>

      {isLoading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="shadow bg-[#0b3a52] p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-gray-800">
                <th className="p-3">Order ID</th>
                <th className="p-3">User</th>
                <th className="p-3">Total</th>
                <th className="p-3">Paid</th>
                <th className="p-3">Delivered</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
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

                    {!order.isCancelled && !order.isDelivered && (
                      <button
                        onClick={() => handleDelivered(order._id)}
                        className="text-green-600 underline"
                        disabled={loadingId === order._id}
                      >
                        {loadingId === order._id ? "Updating..." : "Mark Delivered"}
                      </button>
                    )}

                    {!order.isCancelled && !order.isDelivered && (
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
