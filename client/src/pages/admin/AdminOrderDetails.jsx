import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../features/order/orderApi";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const { data: order, isLoading } = useGetOrderByIdQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (!order) return <p>No order found</p>;

  return (
    <div className="bg-gray-800 h-screen shadow p-6 space-y-4">

      <h1 className="text-2xl font-bold">Order #{order._id.slice(-6)}</h1>

      {/* USER INFO */}
      <div className="border p-4 rounded">
        <h2 className="text-lg font-semibold mb-1">Customer Details</h2>
        <p>Name: {order.user?.name}</p>
        <p>Email: {order.user?.email}</p>
      </div>

      {/* SHIPPING INFO */}
      <div className="border p-4 rounded">
        <h2 className="text-lg font-semibold mb-1">Shipping</h2>
        <p>{order.shippingAddress?.address}</p>
        <p>{order.shippingAddress?.city}</p>
        <p>{order.shippingAddress?.zipCode}</p>
      </div>

      {/* ITEMS */}
      <div className="border p-4 rounded">
        <h2 className="text-lg font-semibold mb-3">Items</h2>

        {order.orderItems.map((item) => (
          <div key={item._id} className="flex items-center gap-4 border-b py-3">
            <img src={item.image} className="w-16 h-16 object-cover rounded" />
            <p className="font-medium">{item.name}</p>
            <p>Qty: {item.qty}</p>
            <p className="ml-auto">₹{item.price}</p>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="border p-4 rounded text-right text-lg font-bold">
        Total: ₹{order.totalPrice}
      </div>
    </div>
  );
}
