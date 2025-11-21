// import { Link } from "react-router-dom";
// import { useGetAllOrdersQuery, useCancelOrderMutation, useUpdateOrderToDeliveredMutation } 
// from "../../features/order/orderApi";
// import { toast } from "react-hot-toast";
// import { useState } from "react";

// export default function AdminOrders() {
//   const { data: orders = [], isLoading } = useGetAllOrdersQuery();
//   const [cancelOrder] = useCancelOrderMutation();
//   const [markDelivered] = useUpdateOrderToDeliveredMutation();

//   const [loadingId, setLoadingId] = useState(null);

//   const handleCancel = async (id) => {
//     if (!confirm("Cancel this order?")) return;

//     try {
//       setLoadingId(id);
//       await cancelOrder(id).unwrap();
//       toast.success("Order cancelled");
//     } catch (err) {
//       toast.error("Failed to cancel");
//       console.error(err);
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   const handleDelivered = async (id) => {
//     try {
//       setLoadingId(id);
//       await markDelivered(id).unwrap();
//       toast.success("Order delivered");
//     } catch (err) {
//       toast.error("Failed to update status");
//       console.error(err);
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   return (
//     <div className="bg-[#0e506f] h-screen">
//       <h1 className="text-2xl font-bold px-4 py-2 bg-[#0e506f]">Orders</h1>

//       {isLoading ? (
//         <p className="px-4">Loading orders...</p>
//       ) : (
//         <div className="shadow bg-[#0b3a52] overflow-x-auto h-screen pb-12">
//           <table className="w-full text-left">
//             <thead className="sticky top-0">
//               <tr className=" bg-gray-800">
//                 <th className="p-2">Order ID</th>
//                 <th className="p-2">User</th>
//                 <th className="p-2">Total</th>
//                 <th className="p-2">Paid</th>
//                 <th className="p-2">Delivered</th>
//                 <th className="p-2">Date</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id} className="border-b hover:bg-gray-600">
//                   <td className="p-3 font-semibold">#{order._id.slice(-6)}</td>
//                   <td className="p-3">{order.user?.name || "Unknown"}</td>
//                   <td className="p-3">₹{order.totalPrice}</td>

//                   <td className="p-3">
//                     {order.isPaid ? (
//                       <span className="text-green-600 font-medium">Paid</span>
//                     ) : (
//                       <span className="text-yellow-600 font-medium">Pending</span>
//                     )}
//                   </td>

//                   <td className="p-3">
//                     {order.isDelivered ? (
//                       <span className="text-green-600 font-medium">Delivered</span>
//                     ) : (
//                       <span className="text-red-500 font-medium">Not Delivered</span>
//                     )}
//                   </td>

//                   <td className="p-3">
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </td>

//                   <td className="p-3 space-x-3 flex">
//                     <Link
//                       to={`/admin/orders/${order._id}`}
//                       className="text-blue-600 underline"
//                     >
//                       View
//                     </Link>

//                     {!order.isDelivered && (
//                       <button
//                         onClick={() => handleDelivered(order._id)}
//                         className="text-green-600 underline"
//                         disabled={loadingId === order._id}
//                       >
//                         {loadingId === order._id ? "Updating..." : "Mark Delivered"}
//                       </button>
//                     )}

//                     {!order.isCancelled && (
//                       <button
//                         onClick={() => handleCancel(order._id)}
//                         className="text-red-500 underline"
//                         disabled={loadingId === order._id}
//                       >
//                         {loadingId === order._id ? "Cancelling..." : "Cancel"}
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


import { Link } from "react-router-dom";
import {
  useGetAllOrdersQuery,
  useCancelOrderMutation,
  useUpdateOrderToDeliveredMutation,
} from "../../features/order/orderApi";
import { toast } from "react-hot-toast";
import { useState } from "react";

/**
 * Admin orders list — Myntra/Flipkart style cards (NO IMAGES).
 * - Shows each order as a card with item list (text-only)
 * - Buttons for View / Mark Delivered / Cancel
 */

export default function AdminOrdersCards() {
  const { data: orders = [], isLoading, isFetching, error } = useGetAllOrdersQuery();
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();
  const [markDelivered, { isLoading: isMarkingDelivered }] = useUpdateOrderToDeliveredMutation();

  const [loadingId, setLoadingId] = useState(null);

  const handleCancel = async (id) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    try {
      setLoadingId(id);
      const result = await cancelOrder(id).unwrap();
      toast.success("Order cancelled successfully");
      console.log("CANCEL RESPONSE:", result);
    } catch (err) {
      console.error("Cancel error:", err);
      toast.error(err?.data?.message || "Failed to cancel order");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelivered = async (id) => {
    if (!confirm("Mark this order as delivered?")) return;
    try {
      setLoadingId(id);
      await markDelivered(id).unwrap();
      toast.success("Order marked as delivered");
    } catch (err) {
      console.error("Deliver error:", err);
      toast.error(err?.data?.message || "Failed to update order");
    } finally {
      setLoadingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Orders</h1>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white/5 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <div className="h-4 w-48 bg-gray-600 rounded" />
              <div className="h-4 w-24 bg-gray-600 rounded" />
            </div>
            <div className="h-3 w-3/4 bg-gray-600 rounded mb-2" />
            <div className="h-3 w-1/2 bg-gray-600 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-2">Orders</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          Failed to load orders. {error?.status && <span>(Status: {String(error.status)})</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between bg-[#043b5b] px-2 py-1">
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <div className="text-sm text-gray-400">
          {isFetching ? "Refreshing…" : `${orders.length} order${orders.length !== 1 ? "s" : ""}`}
        </div>
      </div>

      <div className="grid gap-4">
        {orders.length === 0 && (
          <div className="text-center text-gray-400 p-8">No orders yet.</div>
        )}

        {orders.map((order) => (
          <article
            key={order._id}
            className="bg-white shadow-sm rounded-md border border-gray-200 overflow-hidden"
            aria-labelledby={`order-${order._id}`}
          >
            <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-start md:justify-between">
              {/* Left: order meta & item list */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 id={`order-${order._id}`} className="font-semibold text-lg text-gray-800">
                      Order #{order._id.slice(-8)}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {order.user?.name || "Unknown user"} • {order.user?.email || ""}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p className="font-medium text-gray-700">
                      ₹{Number(order.totalPrice).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Items list - no images */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-2">ITEMS:</h3>
                    <ul className="text-sm space-y-1">
                      {order.orderItems.map((it, idx) => (
                        <li key={idx} className="flex items-center justify-between">
                          <div className="text-gray-700">
                            <span className="font-medium">{it.name}</span>
                            <span className="text-gray-500"> {it.selectedSize ? `| ${it.selectedSize}` : ""} {it.selectedColor ? `| ${it.selectedColor}` : ""}</span>
                          </div>
                          <div className="text-gray-600">x{it.qty}</div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Shipping & Payment */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Shipping</h3>
                    <p className="text-sm text-gray-700">
                      {order.shippingAddress?.address || "—"}
                      {order.shippingAddress?.city ? `, ${order.shippingAddress.city}` : ""}
                    </p>

                    <h3 className="mt-3 text-sm font-medium text-gray-600 mb-2">Payment</h3>
                    <p className="text-sm">
                      <span className="inline-block mr-2">
                        {order.isPaid ? <span className="text-green-600 font-medium">Paid</span> : <span className="text-yellow-600 font-medium">Pending</span>}
                      </span>
                      • {order.paymentMethod || "—"}
                    </p>

                    <div className="mt-3">
                      {order.isCancelled ? (
                        <span className="inline-block px-2 py-1 text-sm bg-red-50 text-red-600 rounded">Cancelled</span>
                      ) : order.isDelivered ? (
                        <span className="inline-block px-2 py-1 text-sm bg-green-50 text-green-600 rounded">Delivered</span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-sm bg-gray-50 text-gray-700 rounded">Processing</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: actions */}
              <div className="mt-4 md:mt-0 md:ml-6 w-full md:w-56 flex flex-col gap-3">
                <Link
                  to={`/admin/orders/${order._id}`}
                  className="w-full text-center px-3 py-2 border rounded text-sm text-gray-800 hover:bg-black hover:text-white"
                >
                  View Details
                </Link>

                {!order.isDelivered && !order.isCancelled && (
                  <button
                    onClick={() => handleDelivered(order._id)}
                    disabled={loadingId === order._id}
                    className="w-full px-3 py-2 rounded bg-green-600 text-white text-sm hover:brightness-95 disabled:opacity-50"
                    aria-disabled={loadingId === order._id}
                  >
                    {loadingId === order._id && isMarkingDelivered ? "Updating..." : "Mark Delivered"}
                  </button>
                )}

                {!order.isCancelled && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    disabled={loadingId === order._id}
                    className="w-full px-3 py-2 rounded border text-red-600 hover:bg-red-50 disabled:opacity-50 text-sm"
                  >
                    {loadingId === order._id && isCancelling ? "Cancelling..." : "Cancel Order"}
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
