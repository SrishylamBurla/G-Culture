import { Link } from "react-router-dom";
import {
  useGetAllOrdersQuery,
  useCancelOrderMutation,
  useUpdateOrderToDeliveredMutation,
} from "../../features/order/orderApi";

import { toast } from "react-hot-toast";
import { useMemo, useState } from "react";

import {
  ShoppingBag,
  Search,
  X,
  Eye,
  CheckCircle2,
  XCircle,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  User,
  AlertTriangle,
  Truck,
  ChevronRight,
  IndianRupee,
} from "lucide-react";

export default function AdminOrdersCards() {
  const {
    data: orders = [],
    isLoading,
    isFetching,
    error,
  } = useGetAllOrdersQuery();

  const [
    cancelOrder,
    { isLoading: isCancelling },
  ] = useCancelOrderMutation();

  const [
    markDelivered,
    { isLoading: isMarkingDelivered },
  ] = useUpdateOrderToDeliveredMutation();

  const [loadingId, setLoadingId] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [actionOrder, setActionOrder] =
    useState(null);

  const [actionType, setActionType] =
    useState(null);

  /* =========================================================
     ORDER STATUS
  ========================================================= */

  const getOrderStatus = (order) => {
    if (order.isCancelled) {
      return "cancelled";
    }

    if (order.isDelivered) {
      return "delivered";
    }

    return "processing";
  };

  /* =========================================================
     SEARCH + FILTER
  ========================================================= */

  const filteredOrders = useMemo(() => {
    const search =
      searchTerm.toLowerCase().trim();

    return orders.filter((order) => {
      const status =
        getOrderStatus(order);

      const orderId =
        order._id?.toLowerCase() || "";

      const customerName =
        order.user?.name?.toLowerCase() ||
        "";

      const customerEmail =
        order.user?.email?.toLowerCase() ||
        "";

      const matchesSearch =
        !search ||
        orderId.includes(search) ||
        customerName.includes(search) ||
        customerEmail.includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    orders,
    searchTerm,
    statusFilter,
  ]);

  /* =========================================================
     COUNTS
  ========================================================= */

  const deliveredCount =
    orders.filter(
      (order) => order.isDelivered
    ).length;

  const cancelledCount =
    orders.filter(
      (order) => order.isCancelled
    ).length;

  const processingCount =
    orders.length -
    deliveredCount -
    cancelledCount;

  const paidCount =
    orders.filter(
      (order) => order.isPaid
    ).length;

  /* =========================================================
     OPEN ACTION MODAL
  ========================================================= */

  const openActionModal = (
    order,
    type
  ) => {
    setActionOrder(order);
    setActionType(type);
  };

  /* =========================================================
     CLOSE ACTION MODAL
  ========================================================= */

  const closeActionModal = () => {
    if (
      isCancelling ||
      isMarkingDelivered
    ) {
      return;
    }

    setActionOrder(null);
    setActionType(null);
  };

  /* =========================================================
     CONFIRM ACTION
  ========================================================= */

  const confirmAction = async () => {
    if (!actionOrder) return;

    const id = actionOrder._id;

    try {
      setLoadingId(id);

      if (actionType === "cancel") {
        await cancelOrder(id).unwrap();

        toast.success(
          "Order cancelled successfully"
        );
      }

      if (
        actionType === "delivered"
      ) {
        await markDelivered(id).unwrap();

        toast.success(
          "Order marked as delivered"
        );
      }

      setActionOrder(null);
      setActionType(null);
    } catch (err) {
      console.error(
        "Order action error:",
        err
      );

      toast.error(
        err?.data?.message ||
          "Failed to update order"
      );
    } finally {
      setLoadingId(null);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f7f8] p-4 sm:p-6 lg:p-8">

        <div className="mx-auto max-w-[1600px] space-y-6">

          <div className="space-y-2">
            <div className="h-7 w-32 animate-pulse rounded-lg bg-gray-200" />

            <div className="h-4 w-64 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  className="h-28 animate-pulse rounded-2xl bg-white shadow-sm"
                />
              )
            )}

          </div>

          <div className="space-y-4">

            {[1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-2xl bg-white shadow-sm"
                />
              )
            )}

          </div>

        </div>

      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <div className="min-h-screen bg-[#f7f7f8] p-4 sm:p-6 lg:p-8">

        <div className="mx-auto max-w-[1600px]">

          <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
              <AlertTriangle
                size={22}
                className="text-red-500"
              />
            </div>

            <h2 className="mt-4 text-base font-semibold text-gray-900">
              Failed to load orders
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Something went wrong while
              retrieving your orders.
            </p>

            {error?.status && (
              <p className="mt-3 text-[10px] font-mono text-gray-300">
                Status:{" "}
                {String(error.status)}
              </p>
            )}

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#111114]">

      <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">
              G-Culture Admin
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Orders
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage orders, payments and deliveries.
            </p>

          </div>

          {/* SEARCH */}

          <div className="relative w-full lg:w-80">

            <Search
              size={16}
              strokeWidth={1.7}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              placeholder="Search orders or customers..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-10 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-gray-400 focus:ring-4 focus:ring-gray-900/[0.04]"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() =>
                  setSearchTerm("")
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-700"
              >
                <X size={15} />
              </button>
            )}

          </div>

        </div>

        {/* =====================================================
            SUMMARY
        ====================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <SummaryCard
            icon={ShoppingBag}
            label="Total Orders"
            value={orders.length}
            description={
              isFetching
                ? "Refreshing..."
                : "All orders"
            }
          />

          <SummaryCard
            icon={Clock3}
            label="Processing"
            value={processingCount}
            description="Awaiting delivery"
            iconClass="text-amber-600"
            bgClass="bg-amber-50"
          />

          <SummaryCard
            icon={Truck}
            label="Delivered"
            value={deliveredCount}
            description="Successfully completed"
            iconClass="text-emerald-600"
            bgClass="bg-emerald-50"
          />

          <SummaryCard
            icon={CreditCard}
            label="Paid Orders"
            value={paidCount}
            description={`${cancelledCount} cancelled`}
            iconClass="text-violet-600"
            bgClass="bg-violet-50"
          />

        </div>

        {/* =====================================================
            ORDER LIST
        ====================================================== */}

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* TOOLBAR */}

          <div className="flex flex-col gap-4 border-b border-gray-100 p-5">

            <div className="flex items-center justify-between gap-4">

              <div>

                <h2 className="text-base font-semibold text-gray-900">
                  Order Management
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  {filteredOrders.length}{" "}
                  {filteredOrders.length ===
                  1
                    ? "order"
                    : "orders"}{" "}
                  displayed
                </p>

              </div>

              {isFetching && (
                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">

                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400" />

                  Updating

                </span>
              )}

            </div>

            {/* FILTERS */}

            <div className="flex items-center gap-2 overflow-x-auto pb-1">

              <FilterButton
                active={
                  statusFilter === "all"
                }
                onClick={() =>
                  setStatusFilter("all")
                }
              >
                All
              </FilterButton>

              <FilterButton
                active={
                  statusFilter ===
                  "processing"
                }
                onClick={() =>
                  setStatusFilter(
                    "processing"
                  )
                }
              >
                Processing
              </FilterButton>

              <FilterButton
                active={
                  statusFilter ===
                  "delivered"
                }
                onClick={() =>
                  setStatusFilter(
                    "delivered"
                  )
                }
              >
                Delivered
              </FilterButton>

              <FilterButton
                active={
                  statusFilter ===
                  "cancelled"
                }
                onClick={() =>
                  setStatusFilter(
                    "cancelled"
                  )
                }
              >
                Cancelled
              </FilterButton>

            </div>

          </div>

          {/* ORDERS */}

          <div className="space-y-4 bg-gray-50/50 p-4 sm:p-5">

            {filteredOrders.map(
              (order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  loadingId={loadingId}
                  onCancel={() =>
                    openActionModal(
                      order,
                      "cancel"
                    )
                  }
                  onDelivered={() =>
                    openActionModal(
                      order,
                      "delivered"
                    )
                  }
                />
              )
            )}

            {/* EMPTY */}

            {filteredOrders.length ===
              0 && (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50">
                  <ShoppingBag
                    size={22}
                    className="text-gray-300"
                  />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-gray-700">
                  No orders found
                </h3>

                <p className="mt-1 max-w-xs text-xs leading-5 text-gray-400">
                  {orders.length === 0
                    ? "Orders will appear here when customers place them."
                    : "Try changing your search or status filter."}
                </p>

                {(searchTerm ||
                  statusFilter !==
                    "all") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter(
                        "all"
                      );
                    }}
                    className="mt-4 text-xs font-semibold text-gray-900 underline underline-offset-4"
                  >
                    Clear filters
                  </button>
                )}

              </div>
            )}

          </div>

        </section>

      </div>

      {/* =======================================================
          CONFIRMATION MODAL
      ======================================================== */}

      {actionOrder && (
        <OrderActionModal
          order={actionOrder}
          type={actionType}
          loading={
            actionType === "cancel"
              ? isCancelling
              : isMarkingDelivered
          }
          onClose={closeActionModal}
          onConfirm={confirmAction}
        />
      )}

    </div>
  );
}

/* =============================================================
   SUMMARY CARD
============================================================= */

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  iconClass = "text-gray-700",
  bgClass = "bg-gray-50",
}) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${bgClass}`}
        >
          <Icon
            size={18}
            strokeWidth={1.6}
            className={iconClass}
          />
        </div>

        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-300">
          G-Culture
        </span>

      </div>

      <div className="mt-5">

        <p className="text-xs font-medium text-gray-400">
          {label}
        </p>

        <p className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
          {value}
        </p>

        <p className="mt-1 text-[11px] text-gray-400">
          {description}
        </p>

      </div>

    </div>
  );
}

/* =============================================================
   FILTER BUTTON
============================================================= */

function FilterButton({
  children,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        shrink-0
        rounded-full
        border
        px-3.5
        py-1.5
        text-[10px]
        font-semibold
        transition-all
        ${
          active
            ? "border-[#111114] bg-[#111114] text-white"
            : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-800"
        }
      `}
    >
      {children}
    </button>
  );
}

/* =============================================================
   ORDER CARD
============================================================= */

function OrderCard({
  order,
  loadingId,
  onCancel,
  onDelivered,
}) {
  const status =
    order.isCancelled
      ? "cancelled"
      : order.isDelivered
        ? "delivered"
        : "processing";

  const isLoading =
    loadingId === order._id;

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">

      {/* =====================================================
          ORDER HEADER
      ====================================================== */}

      <div className="border-b border-gray-100 p-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* ORDER INFO */}

          <div className="flex min-w-0 items-start gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-50">
              <Package
                size={18}
                className="text-gray-500"
              />
            </div>

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">

                <h2 className="text-sm font-semibold text-gray-900">
                  Order #
                  {order._id?.slice(
                    -8
                  )}
                </h2>

                <OrderStatusBadge
                  status={status}
                />

              </div>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-gray-400">

                <span>
                  {order.user?.name ||
                    "Unknown user"}
                </span>

                <span className="text-gray-200">
                  •
                </span>

                <span className="truncate">
                  {order.user?.email ||
                    "No email"}
                </span>

              </div>

            </div>

          </div>

          {/* DATE / TOTAL */}

          <div className="flex items-center justify-between gap-6 lg:justify-end">

            <div className="text-left lg:text-right">

              <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                Order Date
              </p>

              <p className="mt-1 text-xs text-gray-600">
                {new Date(
                  order.createdAt
                ).toLocaleString()}
              </p>

            </div>

            <div className="text-right">

              <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                Total
              </p>

              <p className="mt-1 text-base font-semibold text-gray-900">
                ₹
                {Number(
                  order.totalPrice || 0
                ).toLocaleString(
                  "en-IN"
                )}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="grid grid-cols-1 divide-y divide-gray-100 lg:grid-cols-3 lg:divide-x lg:divide-y-0">

        {/* ===================================================
            ITEMS
        ==================================================== */}

        <div className="p-5">

          <SectionHeading
            icon={ShoppingBag}
            title="Items"
          />

          <div className="mt-4 space-y-3">

            {order.orderItems?.map(
              (item, index) => (
                <div
                  key={
                    item._id ||
                    `${item.name}-${index}`
                  }
                  className="flex items-start justify-between gap-3"
                >

                  <div className="min-w-0">

                    <p className="truncate text-xs font-medium text-gray-800">
                      {item.name}
                    </p>

                    {(item.selectedSize ||
                      item.selectedColor) && (
                      <div className="mt-1 flex flex-wrap gap-1.5">

                        {item.selectedSize && (
                          <span className="rounded-md bg-gray-50 px-1.5 py-0.5 text-[9px] font-medium text-gray-400">
                            Size:{" "}
                            {
                              item.selectedSize
                            }
                          </span>
                        )}

                        {item.selectedColor && (
                          <span className="rounded-md bg-gray-50 px-1.5 py-0.5 text-[9px] font-medium text-gray-400">
                            {
                              item.selectedColor
                            }
                          </span>
                        )}

                      </div>
                    )}

                  </div>

                  <span className="shrink-0 rounded-md bg-gray-50 px-2 py-1 text-[10px] font-semibold text-gray-500">
                    ×{item.qty}
                  </span>

                </div>
              )
            )}

          </div>

        </div>

        {/* ===================================================
            SHIPPING
        ==================================================== */}

        <div className="p-5">

          <SectionHeading
            icon={MapPin}
            title="Shipping"
          />

          <div className="mt-4">

            <p className="text-xs font-medium text-gray-800">
              {order.shippingAddress
                ?.address ||
                "Address unavailable"}
            </p>

            <p className="mt-1 text-[11px] leading-5 text-gray-400">

              {order.shippingAddress
                ?.city &&
                `${order.shippingAddress.city}`}

              {order.shippingAddress
                ?.state &&
                `, ${order.shippingAddress.state}`}

              {order.shippingAddress
                ?.postalCode &&
                ` - ${order.shippingAddress.postalCode}`}

            </p>

          </div>

          {order.shippingAddress
            ?.phone && (
            <div className="mt-4 flex items-center gap-2 text-[11px] text-gray-500">

              <User size={13} />

              {order.shippingAddress.phone}

            </div>
          )}

        </div>

        {/* ===================================================
            PAYMENT
        ==================================================== */}

        <div className="p-5">

          <SectionHeading
            icon={CreditCard}
            title="Payment"
          />

          <div className="mt-4 space-y-3">

            <div className="flex items-center justify-between">

              <span className="text-[11px] text-gray-400">
                Method
              </span>

              <span className="text-xs font-medium capitalize text-gray-700">
                {order.paymentMethod ||
                  "—"}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-[11px] text-gray-400">
                Payment
              </span>

              <PaymentBadge
                paid={order.isPaid}
              />

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          ACTIONS
      ====================================================== */}

      <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-2">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">

            <IndianRupee
              size={13}
              className="text-gray-400"
            />

          </div>

          <div>

            <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
              Order Value
            </p>

            <p className="text-xs font-semibold text-gray-700">
              ₹
              {Number(
                order.totalPrice || 0
              ).toLocaleString(
                "en-IN"
              )}
            </p>

          </div>

        </div>

        <div className="flex flex-col gap-2 sm:flex-row">

          <Link
            to={`/admin/orders/${order._id}`}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-[10px] font-semibold text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
          >
            <Eye size={13} />

            View Details

            <ChevronRight size={12} />

          </Link>

          {!order.isDelivered &&
            !order.isCancelled && (
              <>
                <button
                  type="button"
                  onClick={onDelivered}
                  disabled={isLoading}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 text-[10px] font-semibold text-white transition-all hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CheckCircle2
                    size={13}
                  />

                  {isLoading &&
                  loadingId ===
                    order._id
                    ? "Updating..."
                    : "Mark Delivered"}

                </button>

                <button
                  type="button"
                  onClick={onCancel}
                  disabled={isLoading}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 text-[10px] font-semibold text-red-600 transition-all hover:border-red-200 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <XCircle size={13} />

                  Cancel Order

                </button>
              </>
            )}

        </div>

      </div>

    </article>
  );
}

/* =============================================================
   SECTION HEADING
============================================================= */

function SectionHeading({
  icon: Icon,
  title,
}) {
  return (
    <div className="flex items-center gap-2">

      <Icon
        size={14}
        strokeWidth={1.7}
        className="text-gray-400"
      />

      <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
        {title}
      </h3>

    </div>
  );
}

/* =============================================================
   ORDER STATUS
============================================================= */

function OrderStatusBadge({
  status,
}) {
  if (status === "delivered") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-600">

        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

        Delivered

      </span>
    );
  }

  if (status === "cancelled") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-[9px] font-semibold text-red-600">

        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

        Cancelled

      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-[9px] font-semibold text-amber-600">

      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />

      Processing

    </span>
  );
}

/* =============================================================
   PAYMENT BADGE
============================================================= */

function PaymentBadge({
  paid,
}) {
  if (paid) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-600">

        <CheckCircle2 size={10} />

        Paid

      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-[9px] font-semibold text-amber-600">

      <Clock3 size={10} />

      Pending

    </span>
  );
}

/* =============================================================
   ACTION MODAL
============================================================= */

function OrderActionModal({
  order,
  type,
  loading,
  onClose,
  onConfirm,
}) {
  const isCancel =
    type === "cancel";

  return (
    <div
      className="fixed inset-0 z-[100001] flex items-center justify-center bg-black/65 px-4 backdrop-blur-md"
      onMouseDown={onClose}
    >

      <div
        className={`relative w-full max-w-md overflow-hidden rounded-2xl border bg-white shadow-[0_30px_100px_rgba(0,0,0,0.3)] ${
          isCancel
            ? "border-red-100"
            : "border-emerald-100"
        }`}
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >

        {/* ACCENT */}

        <div
          className={`absolute left-0 right-0 top-0 h-1 ${
            isCancel
              ? "bg-red-500"
              : "bg-emerald-500"
          }`}
        />

        <div className="p-6 sm:p-7">

          {/* ICON */}

          <div className="flex items-start justify-between">

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                isCancel
                  ? "bg-red-50"
                  : "bg-emerald-50"
              }`}
            >
              {isCancel ? (
                <AlertTriangle
                  size={20}
                  className="text-red-500"
                />
              ) : (
                <Truck
                  size={20}
                  className="text-emerald-500"
                />
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50"
            >
              <X size={16} />
            </button>

          </div>

          {/* TEXT */}

          <div className="mt-6">

            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                isCancel
                  ? "text-red-500/70"
                  : "text-emerald-600/70"
              }`}
            >
              {isCancel
                ? "Destructive Action"
                : "Order Update"}
            </p>

            <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-gray-900">
              {isCancel
                ? "Cancel this order?"
                : "Mark as delivered?"}
            </h3>

            <p className="mt-2 text-[13px] leading-5 text-gray-500">

              {isCancel
                ? "This order will be marked as cancelled. Make sure the order has not already been dispatched."
                : "Confirm that this order has been successfully delivered to the customer."}

            </p>

          </div>

          {/* ORDER PREVIEW */}

          <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Order
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-800">
                  #
                  {order._id?.slice(
                    -8
                  )}
                </p>

              </div>

              <div className="text-right">

                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Total
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-800">
                  ₹
                  {Number(
                    order.totalPrice ||
                      0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>

              </div>

            </div>

            <div className="mt-3 border-t border-gray-200 pt-3">

              <p className="truncate text-xs font-medium text-gray-700">
                {order.user?.name ||
                  "Unknown customer"}
              </p>

              <p className="mt-1 truncate text-[10px] text-gray-400">
                {order.user?.email ||
                  "No email"}
              </p>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="mt-6 flex gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-gray-200 py-3 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50"
            >
              Go Back
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className={`flex-1 rounded-xl py-3 text-xs font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                isCancel
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-emerald-500 hover:bg-emerald-600"
              }`}
            >
              {loading
                ? isCancel
                  ? "Cancelling..."
                  : "Updating..."
                : isCancel
                  ? "Cancel Order"
                  : "Mark Delivered"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}