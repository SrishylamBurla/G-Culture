import { useParams, Link } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../features/order/orderApi";

export default function AdminOrderDetails() {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(id);

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f7f8] p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl animate-pulse space-y-6">
          <div className="h-10 w-56 rounded-lg bg-gray-200" />

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="h-40 rounded-2xl bg-gray-200" />
            <div className="h-40 rounded-2xl bg-gray-200" />
          </div>

          <div className="h-80 rounded-2xl bg-gray-200" />
        </div>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (isError || !order) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#f7f7f8] p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl">
            !
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Order not found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            We couldn't find the order you're looking for.
          </p>

          <Link
            to="/admin/orders"
            className="
              mt-5
              inline-flex
              items-center
              rounded-xl
              bg-gray-900
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-gray-700
            "
          >
            ← Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const orderId = order._id?.slice(-6)?.toUpperCase();

  const orderItems = order.orderItems || [];

  const subtotal = orderItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.qty || 0),
    0
  );

  /* =========================================================
     STATUS
  ========================================================= */

  const status = order.status || "Pending";

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    canceled: "bg-red-100 text-red-700",
  };

  const statusClass =
    statusStyles[String(status).toLowerCase()] ||
    "bg-gray-100 text-gray-700";

  return (
    <div className="min-h-screen bg-[#f7f7f8] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-2">
              <Link
                to="/admin/orders"
                className="
                  text-sm
                  font-medium
                  text-gray-500
                  transition
                  hover:text-gray-900
                "
              >
                ← Back to Orders
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Order #{orderId}
              </h1>

              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  ${statusClass}
                `}
              >
                {status}
              </span>
            </div>

            {order.createdAt && (
              <p className="mt-1 text-sm text-gray-500">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Order Total
            </p>

            <p className="mt-1 text-xl font-bold text-gray-900">
              ₹{Number(order.totalPrice || 0).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* =====================================================
            CUSTOMER + SHIPPING
        ====================================================== */}

        <div className="grid gap-6 lg:grid-cols-2">

          {/* CUSTOMER */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                👤
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  Customer Details
                </h2>

                <p className="text-xs text-gray-500">
                  Information about the buyer
                </p>
              </div>
            </div>

            <div className="space-y-4">

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Name
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {order.user?.name || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Email
                </p>

                <p className="mt-1 break-all text-sm text-gray-700">
                  {order.user?.email || "N/A"}
                </p>
              </div>

              {order.user?.phone && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {order.user.phone}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SHIPPING */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                📦
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  Shipping Address
                </h2>

                <p className="text-xs text-gray-500">
                  Delivery information
                </p>
              </div>
            </div>

            <div className="space-y-1 text-sm text-gray-700">
              <p className="font-medium text-gray-900">
                {order.shippingAddress?.address || "N/A"}
              </p>

              {order.shippingAddress?.address2 && (
                <p>{order.shippingAddress.address2}</p>
              )}

              <p>
                {order.shippingAddress?.city || ""}
                {order.shippingAddress?.city &&
                order.shippingAddress?.state
                  ? ", "
                  : ""}
                {order.shippingAddress?.state || ""}
              </p>

              <p>
                {order.shippingAddress?.zipCode || ""}
              </p>

              {order.shippingAddress?.country && (
                <p>{order.shippingAddress.country}</p>
              )}
            </div>
          </div>
        </div>

        {/* =====================================================
            ORDER ITEMS
        ====================================================== */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-200 px-5 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-900">
                  Order Items
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {orderItems.length}{" "}
                  {orderItems.length === 1 ? "item" : "items"} in this
                  order
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">

            {orderItems.map((item) => {
              const itemTotal =
                Number(item.price || 0) *
                Number(item.qty || 0);

              return (
                <div
                  key={item._id}
                  className="
                    flex
                    flex-col
                    gap-4
                    px-5
                    py-5
                    sm:flex-row
                    sm:items-center
                    sm:px-6
                  "
                >
                  {/* IMAGE */}

                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name || "Product"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                        No image
                      </div>
                    )}
                  </div>

                  {/* PRODUCT INFO */}

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-gray-900">
                      {item.name || "Product"}
                    </h3>

                    {item.product && (
                      <p className="mt-1 text-xs text-gray-400">
                        Product ID: {item.product}
                      </p>
                    )}

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <span>
                        ₹{Number(item.price || 0).toLocaleString("en-IN")}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-gray-300" />

                      <span>
                        Qty: {item.qty || 0}
                      </span>
                    </div>
                  </div>

                  {/* ITEM TOTAL */}

                  <div className="text-left sm:text-right">
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Total
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      ₹{itemTotal.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              );
            })}

            {orderItems.length === 0 && (
              <div className="px-6 py-12 text-center text-sm text-gray-500">
                No items found for this order.
              </div>
            )}
          </div>
        </div>

        {/* =====================================================
            ORDER SUMMARY
        ====================================================== */}

        <div className="flex justify-end">
          <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:w-[380px] sm:p-6">

            <h2 className="mb-5 text-lg font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">

              <div className="flex items-center justify-between">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-medium text-gray-900">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              {order.shippingPrice !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span className="font-medium text-gray-900">
                    ₹
                    {Number(order.shippingPrice || 0).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              )}

              {order.taxPrice !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Tax
                  </span>

                  <span className="font-medium text-gray-900">
                    ₹
                    {Number(order.taxPrice || 0).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              )}

              <div className="my-4 border-t border-gray-200" />

              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-gray-900">
                  Total
                </span>

                <span className="text-xl font-bold text-gray-900">
                  ₹
                  {Number(order.totalPrice || 0).toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}