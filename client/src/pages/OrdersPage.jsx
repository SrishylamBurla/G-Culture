import {
  useGetMyOrdersQuery,
  useCancelOrderMutation,
} from "../features/order/orderApi";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Package,
  Eye,
  XCircle,
  ShoppingBag,
  ArrowRight,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock3,
  CalendarDays,
  ChevronRight,
  MapPin,
} from "lucide-react";

import { useState } from "react";
import toast from "react-hot-toast";


/*
=========================================================
STATUS CONFIG
=========================================================
*/

const getOrderStatus = (order) => {
  if (order.isCancelled) {
    return {
      label: "Cancelled",
      icon: XCircle,
      className:
        "bg-red-500/[0.08] text-red-400 border-red-500/15",
      dot: "bg-red-400",
    };
  }

  if (order.isDelivered) {
    return {
      label: "Delivered",
      icon: CheckCircle2,
      className:
        "bg-emerald-500/[0.08] text-emerald-400 border-emerald-500/15",
      dot: "bg-emerald-400",
    };
  }

  if (order.isPaid) {
    return {
      label: "Processing",
      icon: Truck,
      className:
        "bg-blue-500/[0.08] text-blue-400 border-blue-500/15",
      dot: "bg-blue-400",
    };
  }

  return {
    label: "Payment Pending",
    icon: Clock3,
    className:
      "bg-[#d4af37]/[0.08] text-[#d4af37] border-[#d4af37]/15",
    dot: "bg-[#d4af37]",
  };
};


/*
=========================================================
DATE FORMAT
=========================================================
*/

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
};


const formatTime = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};


/*
=========================================================
MAIN COMPONENT
=========================================================
*/

export default function OrdersPage() {
  const {
    data: orders = [],
    isLoading,
  } = useGetMyOrdersQuery();

  const [cancelOrder, { isLoading: isCancelling }] =
    useCancelOrderMutation();

  const [cancelTarget, setCancelTarget] =
    useState(null);


  /*
  =======================================================
  ACTIVE ORDERS
  =======================================================
  */

  const activeOrders = orders.filter(
    (order) => !order.isCancelled
  );


  /*
  =======================================================
  LOADING
  =======================================================
  */

  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#050507] text-white pt-28 md:pt-32 pb-20">

        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

          {/* Header skeleton */}

          <div className="mb-10">
            <div className="h-3 w-20 rounded-full bg-white/[0.06] animate-pulse mb-4" />

            <div className="h-10 w-52 rounded-xl bg-white/[0.06] animate-pulse" />

            <div className="h-4 w-72 rounded-full bg-white/[0.04] animate-pulse mt-4" />
          </div>


          {/* Order skeletons */}

          <div className="space-y-4">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  rounded-2xl
                  border border-white/[0.06]
                  bg-white/[0.025]
                  p-5 md:p-6
                  animate-pulse
                "
              >

                <div className="flex justify-between gap-5">

                  <div className="flex gap-4">

                    <div className="h-11 w-11 rounded-xl bg-white/[0.06]" />

                    <div className="space-y-3">
                      <div className="h-4 w-40 rounded bg-white/[0.06]" />
                      <div className="h-3 w-28 rounded bg-white/[0.04]" />
                    </div>

                  </div>

                  <div className="h-7 w-24 rounded-full bg-white/[0.06]" />

                </div>


                <div className="mt-6 pt-5 border-t border-white/[0.05]">

                  <div className="flex gap-3">

                    {[1, 2, 3].map((x) => (
                      <div
                        key={x}
                        className="h-16 w-16 rounded-xl bg-white/[0.05]"
                      />
                    ))}

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>
    );
  }


  /*
  =======================================================
  EMPTY STATE
  =======================================================
  */

  if (activeOrders.length === 0) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-[#050507] text-white pt-28 md:pt-32 pb-20">

        {/* Ambient background */}

        <div className="pointer-events-none absolute inset-0">

          <div className="
            absolute
            left-1/2
            top-1/3
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-[#d4af37]/[0.025]
            blur-[120px]
          " />

        </div>


        <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

          {/* Header */}

          <div className="mb-10">

            <p className="
              mb-3
              flex
              items-center
              gap-3
              text-[10px]
              font-medium
              uppercase
              tracking-[0.32em]
              text-[#d4af37]/60
            ">
              <span className="h-px w-6 bg-[#d4af37]/40" />
              Account
            </p>

            <h1 className="
              text-3xl
              font-medium
              tracking-[-0.04em]
              sm:text-4xl
              md:text-5xl
            ">
              My Orders
            </h1>

          </div>


          {/* Empty */}

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              relative
              flex
              min-h-[520px]
              flex-col
              items-center
              justify-center
              overflow-hidden
              rounded-3xl
              border
              border-white/[0.06]
              bg-white/[0.02]
              px-6
              text-center
            "
          >

            <div className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06),transparent_55%)]
            " />


            <div className="
              relative
              mb-7
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              border
              border-[#d4af37]/15
              bg-[#d4af37]/[0.04]
            ">

              <ShoppingBag
                size={28}
                strokeWidth={1.3}
                className="text-[#d4af37]/70"
              />

            </div>


            <p className="
              relative
              mb-3
              text-[10px]
              font-medium
              uppercase
              tracking-[0.28em]
              text-gray-600
            ">
              Your wardrobe awaits
            </p>


            <h2 className="
              relative
              text-2xl
              font-medium
              tracking-[-0.03em]
              text-white
            ">
              No orders yet
            </h2>


            <p className="
              relative
              mt-3
              max-w-md
              text-sm
              leading-6
              text-gray-500
            ">
              Discover the latest drops, curated essentials,
              and pieces made to define your rotation.
            </p>


            <Link
              to="/shop"
              className="
                group
                relative
                mt-8
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-white
                px-6
                py-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-black
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#d4af37]
              "
            >
              Start Shopping

              <ArrowRight
                size={14}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />

            </Link>

          </motion.div>

        </div>

      </section>
    );
  }


  /*
  =======================================================
  ORDERS PAGE
  =======================================================
  */

  return (
    <section className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#050507]
      text-white
      pt-28
      md:pt-32
      pb-24
    ">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="pointer-events-none absolute inset-0">

        <div className="
          absolute
          -left-40
          top-40
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#d4af37]/[0.018]
          blur-[120px]
        " />

        <div className="
          absolute
          -right-40
          top-[55%]
          h-[450px]
          w-[450px]
          rounded-full
          bg-white/[0.015]
          blur-[120px]
        " />

      </div>


      <div className="
        relative
        mx-auto
        max-w-6xl
        px-5
        sm:px-6
        lg:px-8
      ">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.header
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
          }}
          className="
            mb-10
            flex
            flex-col
            gap-6
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >

          <div>

            <p className="
              mb-3
              flex
              items-center
              gap-3
              text-[10px]
              font-medium
              uppercase
              tracking-[0.32em]
              text-[#d4af37]/60
            ">
              <span className="h-px w-6 bg-[#d4af37]/40" />
              Account
            </p>


            <h1 className="
              text-3xl
              font-medium
              tracking-[-0.045em]
              sm:text-4xl
              md:text-5xl
            ">
              My Orders
            </h1>


            <p className="
              mt-3
              text-sm
              text-gray-500
            ">
              Track and manage your purchases.
            </p>

          </div>


          {/* Order count */}

          <div className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-white/[0.07]
            bg-white/[0.025]
            px-4
            py-2
          ">

            <Package
              size={14}
              className="text-[#d4af37]"
              strokeWidth={1.5}
            />

            <span className="
              text-xs
              text-gray-400
            ">
              {activeOrders.length}
              {" "}
              {activeOrders.length === 1
                ? "Order"
                : "Orders"}
            </span>

          </div>

        </motion.header>


        {/* =================================================
            ORDERS
        ================================================= */}

        <div className="space-y-4">

          {activeOrders.map(
            (order, index) => {

              const status =
                getOrderStatus(order);

              const StatusIcon =
                status.icon;

              const items =
                order.orderItems || [];


              return (
                <motion.article
                  key={order._id}
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.06,
                    duration: 0.5,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  className="
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    transition-all
                    duration-500
                    hover:border-white/[0.12]
                    hover:bg-white/[0.035]
                  "
                >

                  {/* =====================================
                      TOP
                  ====================================== */}

                  <div className="
                    flex
                    flex-col
                    gap-5
                    p-5
                    md:p-6
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                  ">

                    {/* Order identity */}

                    <div className="
                      flex
                      min-w-0
                      items-center
                      gap-4
                    ">

                      <div className="
                        flex
                        h-11
                        w-11
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[#d4af37]/10
                        bg-[#d4af37]/[0.05]
                      ">

                        <Package
                          size={18}
                          strokeWidth={1.4}
                          className="text-[#d4af37]"
                        />

                      </div>


                      <div className="min-w-0">

                        <div className="
                          flex
                          flex-wrap
                          items-center
                          gap-x-3
                          gap-y-1
                        ">

                          <h2 className="
                            text-sm
                            font-semibold
                            text-white
                          ">
                            Order #
                            {order._id
                              ?.slice(-8)
                              .toUpperCase()}
                          </h2>


                          <span className="
                            hidden
                            h-1
                            w-1
                            rounded-full
                            bg-white/20
                            sm:block
                          " />


                          <span className="
                            text-[11px]
                            text-gray-600
                          ">
                            {formatDate(
                              order.createdAt
                            )}
                          </span>

                        </div>


                        <div className="
                          mt-1.5
                          flex
                          items-center
                          gap-2
                          text-[11px]
                          text-gray-600
                        ">

                          <CalendarDays
                            size={12}
                          />

                          {formatTime(
                            order.createdAt
                          )}

                        </div>

                      </div>

                    </div>


                    {/* Status */}

                    <div className={`
                      inline-flex
                      w-fit
                      items-center
                      gap-2
                      rounded-full
                      border
                      px-3
                      py-1.5
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      ${status.className}
                    `}>

                      <span
                        className={`
                          h-1.5
                          w-1.5
                          rounded-full
                          ${status.dot}
                        `}
                      />

                      <StatusIcon
                        size={12}
                        strokeWidth={1.7}
                      />

                      {status.label}

                    </div>

                  </div>


                  {/* =====================================
                      PRODUCT PREVIEW
                  ====================================== */}

                  <div className="
                    border-y
                    border-white/[0.05]
                    bg-black/[0.12]
                    px-5
                    py-4
                    md:px-6
                  ">

                    <div className="
                      flex
                      items-center
                      justify-between
                      gap-4
                    ">

                      <div className="
                        flex
                        min-w-0
                        items-center
                      ">

                        {/* Product images */}

                        <div className="
                          flex
                          items-center
                        ">

                          {items
                            .slice(0, 4)
                            .map(
                              (
                                item,
                                itemIndex
                              ) => (

                                <div
                                  key={
                                    item.product ||
                                    itemIndex
                                  }
                                  className={`
                                    relative
                                    h-14
                                    w-14
                                    overflow-hidden
                                    rounded-xl
                                    border
                                    border-white/[0.08]
                                    bg-white/[0.04]
                                    ${
                                      itemIndex > 0
                                        ? "-ml-3"
                                        : ""
                                    }
                                  `}
                                  style={{
                                    zIndex:
                                      10 -
                                      itemIndex,
                                  }}
                                >

                                  {item.image ? (
                                    <img
                                      src={
                                        item.image
                                      }
                                      alt={
                                        item.name ||
                                        "Product"
                                      }
                                      className="
                                        h-full
                                        w-full
                                        object-cover
                                      "
                                    />
                                  ) : (
                                    <div className="
                                      flex
                                      h-full
                                      w-full
                                      items-center
                                      justify-center
                                    ">
                                      <ShoppingBag
                                        size={16}
                                        className="text-gray-600"
                                      />
                                    </div>
                                  )}

                                </div>

                              )
                            )}


                          {items.length > 4 && (
                            <div className="
                              relative
                              -ml-3
                              flex
                              h-14
                              w-14
                              items-center
                              justify-center
                              rounded-xl
                              border
                              border-white/[0.08]
                              bg-[#111113]
                              text-[10px]
                              font-semibold
                              text-gray-400
                            ">
                              +{items.length - 4}
                            </div>
                          )}

                        </div>


                        <div className="
                          ml-4
                          hidden
                          min-w-0
                          sm:block
                        ">

                          <p className="
                            truncate
                            text-xs
                            font-medium
                            text-gray-300
                          ">
                            {items[0]?.name ||
                              "Order items"}
                          </p>

                          {items.length > 1 && (
                            <p className="
                              mt-1
                              text-[11px]
                              text-gray-600
                            ">
                              + {items.length - 1}
                              {" "}
                              more
                              {items.length - 1 === 1
                                ? " item"
                                : " items"}
                            </p>
                          )}

                        </div>

                      </div>


                      <Link
                        to={`/order/${order._id}`}
                        className="
                          group/details
                          hidden
                          items-center
                          gap-1.5
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-[0.16em]
                          text-gray-500
                          transition-colors
                          hover:text-white
                          sm:inline-flex
                        "
                      >
                        View order

                        <ChevronRight
                          size={13}
                          className="
                            transition-transform
                            duration-300
                            group-hover/details:translate-x-1
                          "
                        />

                      </Link>

                    </div>

                  </div>


                  {/* =====================================
                      SUMMARY
                  ====================================== */}

                  <div className="
                    grid
                    grid-cols-2
                    divide-x
                    divide-white/[0.05]
                    md:grid-cols-4
                  ">

                    {/* Total */}

                    <div className="
                      p-5
                      md:px-6
                      md:py-5
                    ">

                      <p className="
                        mb-1.5
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-gray-600
                      ">
                        Total
                      </p>

                      <p className="
                        text-base
                        font-semibold
                        tracking-tight
                        text-white
                      ">
                        ₹
                        {Number(
                          order.totalPrice || 0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>


                    {/* Items */}

                    <div className="
                      p-5
                      md:px-6
                      md:py-5
                    ">

                      <p className="
                        mb-1.5
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-gray-600
                      ">
                        Items
                      </p>

                      <p className="
                        text-sm
                        font-medium
                        text-gray-300
                      ">
                        {items.length}
                        {" "}
                        {items.length === 1
                          ? "item"
                          : "items"}
                      </p>

                    </div>


                    {/* Payment */}

                    <div className="
                      p-5
                      md:px-6
                      md:py-5
                    ">

                      <p className="
                        mb-1.5
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-gray-600
                      ">
                        Payment
                      </p>

                      <div className="
                        flex
                        items-center
                        gap-1.5
                      ">

                        <CreditCard
                          size={13}
                          className="text-gray-500"
                        />

                        <p className="
                          truncate
                          text-xs
                          font-medium
                          uppercase
                          text-gray-300
                        ">
                          {order.paymentMethod ||
                            "COD"}
                        </p>

                      </div>

                    </div>


                    {/* Delivery */}

                    <div className="
                      col-span-2
                      border-t
                      border-white/[0.05]
                      p-5
                      md:col-span-1
                      md:border-t-0
                      md:border-l
                      md:px-6
                      md:py-5
                    ">

                      <p className="
                        mb-1.5
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-gray-600
                      ">
                        Delivery
                      </p>

                      <div className="
                        flex
                        items-center
                        gap-1.5
                      ">

                        <MapPin
                          size={13}
                          className={
                            order.isDelivered
                              ? "text-emerald-400"
                              : "text-gray-500"
                          }
                        />

                        <p className="
                          text-xs
                          font-medium
                          text-gray-300
                        ">
                          {order.isDelivered
                            ? "Delivered"
                            : order.isPaid
                            ? "On the way"
                            : "Awaiting payment"}
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* =====================================
                      ACTIONS
                  ====================================== */}

                  <div className="
                    flex
                    flex-col
                    gap-3
                    border-t
                    border-white/[0.05]
                    p-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    md:px-6
                  ">

                    <Link
                      to={`/order/${order._id}`}
                      className="
                        group
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-full
                        bg-white
                        px-5
                        py-3
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.15em]
                        text-black
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:bg-[#d4af37]
                        sm:w-auto
                      "
                    >

                      <Eye
                        size={14}
                        strokeWidth={1.8}
                      />

                      View Details

                      <ArrowRight
                        size={13}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />

                    </Link>


                    {!order.isPaid &&
                      !order.isCancelled && (
                        <button
                          type="button"
                          disabled={
                            isCancelling
                          }
                          onClick={() =>
                            setCancelTarget(
                              order
                            )
                          }
                          className="
                            inline-flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-full
                            border
                            border-red-500/15
                            px-5
                            py-3
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.15em]
                            text-red-400
                            transition-all
                            duration-300
                            hover:border-red-500/30
                            hover:bg-red-500/[0.06]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            sm:w-auto
                          "
                        >

                          <XCircle
                            size={14}
                          />

                          Cancel Order

                        </button>
                      )}

                  </div>

                </motion.article>
              );
            }
          )}

        </div>

      </div>


      {/* =================================================
          CANCEL MODAL
      ================================================= */}

      <AnimatePresence>

        {cancelTarget && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/70
              px-5
              backdrop-blur-md
            "
            onClick={() =>
              setCancelTarget(null)
            }
          >

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                w-full
                max-w-md
                rounded-2xl
                border
                border-white/[0.08]
                bg-[#101012]
                p-6
                shadow-2xl
              "
            >

              <div className="
                mb-5
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-red-500/[0.08]
                text-red-400
              ">
                <XCircle
                  size={20}
                  strokeWidth={1.5}
                />
              </div>


              <h3 className="
                text-lg
                font-medium
                text-white
              ">
                Cancel this order?
              </h3>


              <p className="
                mt-2
                text-sm
                leading-6
                text-gray-500
              ">
                Are you sure you want to cancel order{" "}
                <span className="text-gray-300">
                  #
                  {cancelTarget._id
                    ?.slice(-8)
                    .toUpperCase()}
                </span>
                ? This action cannot be undone.
              </p>


              <div className="
                mt-7
                flex
                flex-col-reverse
                gap-3
                sm:flex-row
                sm:justify-end
              ">

                <button
                  type="button"
                  onClick={() =>
                    setCancelTarget(null)
                  }
                  className="
                    rounded-full
                    border
                    border-white/[0.08]
                    px-5
                    py-2.5
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.15em]
                    text-gray-400
                    transition
                    hover:bg-white/[0.04]
                    hover:text-white
                  "
                >
                  Keep Order
                </button>


                <button
                  type="button"
                  disabled={
                    isCancelling
                  }
                  onClick={async () => {
                    try {
                      await cancelOrder(
                        cancelTarget._id
                      ).unwrap();

                      setCancelTarget(null);

                      toast.success(
                        "Order cancelled successfully"
                      );
                    } catch (error) {
                      toast.error(
                        error?.data?.message ||
                          "Failed to cancel order"
                      );
                    }
                  }}
                  className="
                    rounded-full
                    bg-red-500
                    px-5
                    py-2.5
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-white
                    transition
                    hover:bg-red-400
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {isCancelling
                    ? "Cancelling..."
                    : "Cancel Order"}
                </button>

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </section>
  );
}