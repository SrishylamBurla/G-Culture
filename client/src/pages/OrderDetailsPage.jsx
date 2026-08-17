import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useGetOrderByIdQuery,
} from "../features/order/orderApi";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  Package,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  ShieldCheck,
  CalendarDays,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";


/*
=========================================================
DATE HELPERS
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


const formatLongDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
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
CURRENCY
=========================================================
*/

const formatPrice = (value) => {
  return Number(value || 0).toLocaleString(
    "en-IN"
  );
};


/*
=========================================================
STATUS
=========================================================
*/

const getStatus = (order) => {
  if (order.isCancelled) {
    return {
      label: "Cancelled",
      description:
        "This order has been cancelled.",
      icon: XCircle,
      color: "text-red-400",
      bg: "bg-red-500/[0.08]",
      border: "border-red-500/15",
      dot: "bg-red-400",
    };
  }

  if (order.isDelivered) {
    return {
      label: "Delivered",
      description:
        "Your order has been delivered successfully.",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/[0.08]",
      border: "border-emerald-500/15",
      dot: "bg-emerald-400",
    };
  }

  if (order.isPaid) {
    return {
      label: "In Transit",
      description:
        "Your payment is confirmed and your order is being processed.",
      icon: Truck,
      color: "text-blue-400",
      bg: "bg-blue-500/[0.08]",
      border: "border-blue-500/15",
      dot: "bg-blue-400",
    };
  }

  return {
    label: "Payment Pending",
    description:
      "Your order is waiting for payment confirmation.",
    icon: Clock3,
    color: "text-[#d4af37]",
    bg: "bg-[#d4af37]/[0.08]",
    border: "border-[#d4af37]/15",
    dot: "bg-[#d4af37]",
  };
};


/*
=========================================================
MAIN
=========================================================
*/

export default function OrderDetailsPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(id);


  /*
  =======================================================
  LOADING
  =======================================================
  */

  if (isLoading) {
    return (
      <section className="
        min-h-screen
        bg-[#050507]
        text-white
        pt-28
        md:pt-32
        pb-24
      ">

        <div className="
          mx-auto
          max-w-6xl
          px-5
          sm:px-6
          lg:px-8
        ">

          {/* Back */}

          <div className="
            h-4
            w-28
            rounded-full
            bg-white/[0.06]
            animate-pulse
          " />


          {/* Header */}

          <div className="
            mt-8
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-end
            sm:justify-between
          ">

            <div className="space-y-4">

              <div className="
                h-3
                w-24
                rounded-full
                bg-white/[0.05]
              " />

              <div className="
                h-10
                w-52
                rounded-xl
                bg-white/[0.06]
              " />

              <div className="
                h-3
                w-64
                rounded-full
                bg-white/[0.04]
              " />

            </div>


            <div className="
              h-9
              w-28
              rounded-full
              bg-white/[0.05]
            " />

          </div>


          {/* Content */}

          <div className="
            mt-10
            grid
            gap-5
            lg:grid-cols-5
          ">

            <div className="
              space-y-5
              lg:col-span-3
            ">

              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                    p-6
                  "
                >

                  <div className="
                    h-5
                    w-40
                    rounded
                    bg-white/[0.06]
                    animate-pulse
                  " />

                  <div className="
                    mt-6
                    space-y-4
                  ">

                    {[1, 2, 3].map(
                      (row) => (
                        <div
                          key={row}
                          className="
                            flex
                            gap-4
                          "
                        >

                          <div className="
                            h-16
                            w-16
                            flex-shrink-0
                            rounded-xl
                            bg-white/[0.05]
                            animate-pulse
                          " />

                          <div className="
                            flex-1
                            space-y-3
                          ">

                            <div className="
                              h-3
                              w-2/3
                              rounded
                              bg-white/[0.05]
                            " />

                            <div className="
                              h-3
                              w-1/3
                              rounded
                              bg-white/[0.04]
                            " />

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </div>
              ))}

            </div>


            <div className="
              h-[420px]
              rounded-2xl
              border
              border-white/[0.06]
              bg-white/[0.025]
              animate-pulse
              lg:col-span-2
            " />

          </div>

        </div>

      </section>
    );
  }


  /*
  =======================================================
  ERROR
  =======================================================
  */

  if (isError || !order) {
    return (
      <section className="
        min-h-screen
        bg-[#050507]
        text-white
        pt-28
        md:pt-32
        pb-24
      ">

        <div className="
          mx-auto
          flex
          min-h-[60vh]
          max-w-6xl
          items-center
          justify-center
          px-5
        ">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              max-w-md
              text-center
            "
          >

            <div className="
              mx-auto
              mb-6
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border
              border-red-500/15
              bg-red-500/[0.06]
            ">

              <Package
                size={24}
                className="text-red-400"
                strokeWidth={1.4}
              />

            </div>


            <p className="
              text-[10px]
              uppercase
              tracking-[0.28em]
              text-gray-600
            ">
              Order unavailable
            </p>


            <h1 className="
              mt-3
              text-2xl
              font-medium
              tracking-tight
            ">
              We couldn't load this order
            </h1>


            <p className="
              mt-3
              text-sm
              leading-6
              text-gray-500
            ">
              The order may no longer exist or you
              may not have permission to view it.
            </p>


            <button
              type="button"
              onClick={() =>
                navigate("/orders")
              }
              className="
                group
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white
                px-6
                py-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-black
                transition
                hover:bg-[#d4af37]
              "
            >
              Back to Orders

              <ArrowRight
                size={14}
                className="
                  transition-transform
                  group-hover:translate-x-1
                "
              />

            </button>

          </motion.div>

        </div>

      </section>
    );
  }


  const status = getStatus(order);

  const StatusIcon = status.icon;

  const items = order.orderItems || [];


  /*
  =======================================================
  ORDER TIMELINE
  =======================================================
  */

  const timeline = [
    {
      label: "Order placed",
      date: order.createdAt,
      complete: true,
      icon: ShoppingBag,
    },
    {
      label: "Payment confirmed",
      date: order.paidAt,
      complete: order.isPaid,
      icon: CreditCard,
    },
    {
      label: "Shipped",
      date: null,
      complete:
        order.isPaid &&
        !order.isCancelled,
      icon: Truck,
    },
    {
      label: "Delivered",
      date: order.deliveredAt,
      complete: order.isDelivered,
      icon: CheckCircle2,
    },
  ];


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
          AMBIENT BACKGROUND
      ================================================= */}

      <div className="
        pointer-events-none
        absolute
        inset-0
      ">

        <div className="
          absolute
          -left-40
          top-40
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#d4af37]/[0.018]
          blur-[130px]
        " />

        <div className="
          absolute
          -right-40
          top-[45%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-white/[0.012]
          blur-[130px]
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
            BACK
        ================================================= */}

        <motion.button
          initial={{
            opacity: 0,
            x: -10,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          type="button"
          onClick={() =>
            navigate("/orders")
          }
          className="
            group
            inline-flex
            items-center
            gap-2
            text-[10px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-gray-600
            transition
            hover:text-white
          "
        >

          <ArrowLeft
            size={14}
            className="
              transition-transform
              duration-300
              group-hover:-translate-x-1
            "
          />

          Back to Orders

        </motion.button>


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
            mt-8
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

              <span className="
                h-px
                w-6
                bg-[#d4af37]/40
              " />

              Order Details

            </p>


            <div className="
              flex
              flex-wrap
              items-center
              gap-3
            ">

              <h1 className="
                text-3xl
                font-medium
                tracking-[-0.045em]
                sm:text-4xl
                md:text-5xl
              ">
                #
                {order._id
                  ?.slice(-8)
                  .toUpperCase()}
              </h1>

            </div>


            <div className="
              mt-3
              flex
              flex-wrap
              items-center
              gap-x-3
              gap-y-1
              text-xs
              text-gray-600
            ">

              <span>
                Placed{" "}
                {formatLongDate(
                  order.createdAt
                )}
              </span>

              <span className="
                hidden
                h-1
                w-1
                rounded-full
                bg-white/20
                sm:block
              " />

              <span>
                {formatTime(
                  order.createdAt
                )}
              </span>

            </div>

          </div>


          {/* STATUS */}

          <div className={`
            inline-flex
            w-fit
            items-center
            gap-2.5
            rounded-full
            border
            px-4
            py-2.5
            ${status.bg}
            ${status.border}
            ${status.color}
          `}>

            <span className={`
              h-1.5
              w-1.5
              rounded-full
              ${status.dot}
            `} />

            <StatusIcon
              size={14}
              strokeWidth={1.6}
            />

            <span className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
            ">
              {status.label}
            </span>

          </div>

        </motion.header>


        {/* =================================================
            STATUS MESSAGE
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.08,
            duration: 0.5,
          }}
          className="
            mt-8
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.06]
            bg-white/[0.025]
            p-5
            md:p-6
          "
        >

          <div className="
            flex
            gap-4
          ">

            <div className={`
              flex
              h-10
              w-10
              flex-shrink-0
              items-center
              justify-center
              rounded-xl
              ${status.bg}
            `}>

              <StatusIcon
                size={18}
                className={status.color}
                strokeWidth={1.4}
              />

            </div>


            <div>

              <p className="
                text-sm
                font-medium
                text-white
              ">
                {status.description}
              </p>

              <p className="
                mt-1.5
                text-xs
                leading-5
                text-gray-600
              ">
                Order #
                {order._id
                  ?.slice(-8)
                  .toUpperCase()}
              </p>

            </div>

          </div>

        </motion.div>


        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="
          mt-6
          grid
          gap-6
          lg:grid-cols-5
        ">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="
            space-y-6
            lg:col-span-3
          ">

            {/* =============================================
                ITEMS
            ============================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.12,
                duration: 0.5,
              }}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.025]
              "
            >

              {/* Header */}

              <div className="
                flex
                items-center
                justify-between
                border-b
                border-white/[0.05]
                px-5
                py-5
                md:px-6
              ">

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <div className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#d4af37]/[0.06]
                    border
                    border-[#d4af37]/10
                  ">

                    <Package
                      size={17}
                      className="text-[#d4af37]"
                      strokeWidth={1.4}
                    />

                  </div>


                  <div>

                    <h2 className="
                      text-sm
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                    ">
                      Items Ordered
                    </h2>

                    <p className="
                      mt-1
                      text-[11px]
                      text-gray-600
                    ">
                      {items.length}{" "}
                      {items.length === 1
                        ? "item"
                        : "items"}
                    </p>

                  </div>

                </div>

              </div>


              {/* Products */}

              <div className="
                divide-y
                divide-white/[0.05]
              ">

                {items.map(
                  (item, index) => (
                    <motion.div
                      key={
                        item._id ||
                        item.product ||
                        index
                      }
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          0.18 +
                          index * 0.05,
                      }}
                      className="
                        group
                        flex
                        gap-4
                        p-5
                        md:p-6
                      "
                    >

                      {/* Image */}

                      <div className="
                        relative
                        h-20
                        w-20
                        flex-shrink-0
                        overflow-hidden
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-white/[0.04]
                        sm:h-24
                        sm:w-24
                      ">

                        {item.image ? (
                          <img
                            src={item.image}
                            alt={
                              item.name ||
                              "Product"
                            }
                            className="
                              h-full
                              w-full
                              object-cover
                              transition-transform
                              duration-700
                              group-hover:scale-105
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
                              size={20}
                              className="text-gray-600"
                            />

                          </div>
                        )}

                      </div>


                      {/* Information */}

                      <div className="
                        min-w-0
                        flex-1
                      ">

                        <h3 className="
                          line-clamp-2
                          text-sm
                          font-medium
                          leading-5
                          text-white
                        ">
                          {item.name}
                        </h3>


                        {/* Variants */}

                        <div className="
                          mt-2
                          flex
                          flex-wrap
                          gap-2
                        ">

                          {item.selectedSize && (
                            <span className="
                              rounded-md
                              border
                              border-white/[0.07]
                              bg-white/[0.025]
                              px-2
                              py-1
                              text-[9px]
                              uppercase
                              tracking-wider
                              text-gray-500
                            ">
                              Size{" "}
                              {item.selectedSize}
                            </span>
                          )}


                          {item.selectedColor && (
                            <span className="
                              rounded-md
                              border
                              border-white/[0.07]
                              bg-white/[0.025]
                              px-2
                              py-1
                              text-[9px]
                              uppercase
                              tracking-wider
                              text-gray-500
                            ">
                              {item.selectedColor}
                            </span>
                          )}

                        </div>


                        <div className="
                          mt-3
                          flex
                          items-center
                          gap-3
                          text-[11px]
                          text-gray-600
                        ">

                          <span>
                            Qty {item.qty}
                          </span>

                          <span className="
                            h-1
                            w-1
                            rounded-full
                            bg-white/20
                          " />

                          <span>
                            ₹
                            {formatPrice(
                              item.price
                            )}
                            {" "}each
                          </span>

                        </div>

                      </div>


                      {/* Total */}

                      <div className="
                        flex
                        flex-shrink-0
                        flex-col
                        items-end
                        justify-center
                      ">

                        <p className="
                          text-sm
                          font-semibold
                          text-white
                        ">
                          ₹
                          {formatPrice(
                            Number(
                              item.price
                            ) *
                              Number(
                                item.qty
                              )
                          )}
                        </p>

                      </div>

                    </motion.div>
                  )
                )}

              </div>

            </motion.div>


            {/* =============================================
                SHIPPING
            ============================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.5,
              }}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.025]
              "
            >

              <div className="
                border-b
                border-white/[0.05]
                px-5
                py-5
                md:px-6
              ">

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <div className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#d4af37]/[0.06]
                    border
                    border-[#d4af37]/10
                  ">

                    <MapPin
                      size={17}
                      className="text-[#d4af37]"
                      strokeWidth={1.4}
                    />

                  </div>


                  <div>

                    <h2 className="
                      text-sm
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                    ">
                      Shipping Address
                    </h2>

                    <p className="
                      mt-1
                      text-[11px]
                      text-gray-600
                    ">
                      Delivery destination
                    </p>

                  </div>

                </div>

              </div>


              <div className="
                p-5
                md:p-6
              ">

                <div className="
                  rounded-xl
                  border
                  border-white/[0.05]
                  bg-black/[0.12]
                  p-5
                ">

                  <div className="
                    flex
                    gap-3
                  ">

                    <MapPin
                      size={15}
                      className="
                        mt-0.5
                        flex-shrink-0
                        text-gray-500
                      "
                    />

                    <div className="
                      space-y-1.5
                      text-sm
                      leading-5
                      text-gray-400
                    ">

                      <p>
                        {
                          order
                            .shippingAddress
                            ?.address
                        }
                      </p>

                      {order.shippingAddress
                        ?.city && (
                        <p>
                          {
                            order
                              .shippingAddress
                              .city
                          }
                        </p>
                      )}

                      {order.shippingAddress
                        ?.postalCode && (
                        <p>
                          {
                            order
                              .shippingAddress
                              .postalCode
                          }
                        </p>
                      )}

                      {order.shippingAddress
                        ?.country && (
                        <p>
                          {
                            order
                              .shippingAddress
                              .country
                          }
                        </p>
                      )}

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>


            {/* =============================================
                ORDER TIMELINE
            ============================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.24,
                duration: 0.5,
              }}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.025]
              "
            >

              <div className="
                border-b
                border-white/[0.05]
                px-5
                py-5
                md:px-6
              ">

                <h2 className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                ">
                  Order Progress
                </h2>

              </div>


              <div className="
                p-5
                md:p-6
              ">

                <div className="
                  relative
                ">

                  {/* Vertical line */}

                  <div className="
                    absolute
                    left-[17px]
                    top-5
                    bottom-5
                    w-px
                    bg-white/[0.07]
                  " />


                  <div className="
                    space-y-7
                  ">

                    {timeline.map(
                      (step, index) => {

                        const StepIcon =
                          step.icon;

                        return (
                          <div
                            key={
                              step.label
                            }
                            className="
                              relative
                              flex
                              items-start
                              gap-4
                            "
                          >

                            <div className={`
                              relative
                              z-10
                              flex
                              h-9
                              w-9
                              flex-shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              ${
                                step.complete
                                  ? "border-[#d4af37]/20 bg-[#d4af37]/[0.08]"
                                  : "border-white/[0.07] bg-[#0b0b0d]"
                              }
                            `}>

                              <StepIcon
                                size={14}
                                strokeWidth={1.6}
                                className={
                                  step.complete
                                    ? "text-[#d4af37]"
                                    : "text-gray-700"
                                }
                              />

                            </div>


                            <div className="
                              min-w-0
                              pt-0.5
                            ">

                              <p className={`
                                text-sm
                                font-medium
                                ${
                                  step.complete
                                    ? "text-white"
                                    : "text-gray-600"
                                }
                              `}>
                                {step.label}
                              </p>


                              <p className="
                                mt-1
                                text-[11px]
                                text-gray-600
                              ">

                                {step.date
                                  ? formatDate(
                                      step.date
                                    )
                                  : step.complete
                                  ? "Completed"
                                  : "Pending"}

                              </p>

                            </div>

                          </div>
                        );
                      }
                    )}

                  </div>

                </div>

              </div>

            </motion.div>

          </div>


          {/* =================================================
              RIGHT
          ================================================= */}

          <div className="
            lg:col-span-2
          ">

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
                duration: 0.5,
              }}
              className="
                space-y-6
                lg:sticky
                lg:top-28
              "
            >

              {/* ===========================================
                  SUMMARY
              ============================================ */}

              <div className="
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.025]
              ">

                <div className="
                  border-b
                  border-white/[0.05]
                  px-5
                  py-5
                  md:px-6
                ">

                  <h2 className="
                    text-sm
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                  ">
                    Order Summary
                  </h2>

                </div>


                <div className="
                  space-y-4
                  p-5
                  md:p-6
                ">

                  <div className="
                    flex
                    justify-between
                    gap-4
                    text-sm
                  ">

                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span className="text-gray-300">
                      ₹
                      {formatPrice(
                        order.itemsPrice ||
                          order.totalPrice
                      )}
                    </span>

                  </div>


                  <div className="
                    flex
                    justify-between
                    gap-4
                    text-sm
                  ">

                    <span className="text-gray-500">
                      Shipping
                    </span>

                    <span className={
                      order.shippingPrice
                        ? "text-gray-300"
                        : "text-emerald-400"
                    }>

                      {order.shippingPrice
                        ? `₹${formatPrice(
                            order.shippingPrice
                          )}`
                        : "FREE"}

                    </span>

                  </div>


                  <div className="
                    flex
                    justify-between
                    gap-4
                    text-sm
                  ">

                    <span className="text-gray-500">
                      Tax
                    </span>

                    <span className="text-gray-300">
                      ₹
                      {formatPrice(
                        order.taxPrice || 0
                      )}
                    </span>

                  </div>


                  <div className="
                    border-t
                    border-white/[0.07]
                    pt-5
                  ">

                    <div className="
                      flex
                      items-end
                      justify-between
                      gap-4
                    ">

                      <div>

                        <p className="
                          text-[9px]
                          font-medium
                          uppercase
                          tracking-[0.2em]
                          text-gray-600
                        ">
                          Total
                        </p>

                        <p className="
                          mt-1
                          text-xs
                          text-gray-500
                        ">
                          Inclusive of applicable taxes
                        </p>

                      </div>


                      <p className="
                        text-2xl
                        font-semibold
                        tracking-tight
                        text-[#d4af37]
                      ">
                        ₹
                        {formatPrice(
                          order.totalPrice
                        )}
                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* ===========================================
                  PAYMENT
              ============================================ */}

              <div className="
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.025]
              ">

                <div className="
                  border-b
                  border-white/[0.05]
                  px-5
                  py-5
                  md:px-6
                ">

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <div className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#d4af37]/[0.06]
                      border
                      border-[#d4af37]/10
                    ">

                      <CreditCard
                        size={15}
                        className="text-[#d4af37]"
                      />

                    </div>


                    <h2 className="
                      text-sm
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                    ">
                      Payment
                    </h2>

                  </div>

                </div>


                <div className="
                  space-y-5
                  p-5
                  md:p-6
                ">

                  <div>

                    <p className="
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                      text-gray-600
                    ">
                      Method
                    </p>

                    <p className="
                      mt-1.5
                      text-sm
                      font-medium
                      uppercase
                      text-gray-300
                    ">
                      {order.paymentMethod ||
                        "Cash on Delivery"}
                    </p>

                  </div>


                  <div className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/[0.05]
                    bg-black/[0.12]
                    p-4
                  ">

                    <div className={`
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      ${
                        order.isPaid
                          ? "bg-emerald-500/[0.08]"
                          : "bg-[#d4af37]/[0.08]"
                      }
                    `}>

                      {order.isPaid ? (
                        <CheckCircle2
                          size={16}
                          className="text-emerald-400"
                        />
                      ) : (
                        <Clock3
                          size={16}
                          className="text-[#d4af37]"
                        />
                      )}

                    </div>


                    <div>

                      <p className="
                        text-[9px]
                        uppercase
                        tracking-[0.18em]
                        text-gray-600
                      ">
                        Payment Status
                      </p>

                      <p className={`
                        mt-1
                        text-xs
                        font-medium
                        ${
                          order.isPaid
                            ? "text-emerald-400"
                            : "text-[#d4af37]"
                        }
                      `}>

                        {order.isPaid
                          ? `Paid ${
                              order.paidAt
                                ? `· ${formatDate(
                                    order.paidAt
                                  )}`
                                : ""
                            }`
                          : "Awaiting payment"}

                      </p>

                    </div>

                  </div>


                  <div className="
                    flex
                    items-center
                    gap-2
                    text-[10px]
                    leading-4
                    text-gray-600
                  ">

                    <ShieldCheck
                      size={13}
                      className="flex-shrink-0"
                    />

                    Your order information is securely
                    associated with your account.

                  </div>

                </div>

              </div>


              {/* ===========================================
                  DELIVERY
              ============================================ */}

              <div className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-5
                md:p-6
              ">

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <div className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/[0.04]
                    border
                    border-white/[0.06]
                  ">

                    <Truck
                      size={15}
                      className="text-gray-400"
                    />

                  </div>


                  <div>

                    <p className="
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                      text-gray-600
                    ">
                      Delivery
                    </p>

                    <p className="
                      mt-1
                      text-sm
                      font-medium
                      text-gray-300
                    ">

                      {order.isDelivered
                        ? "Order delivered"
                        : order.isPaid
                        ? "Preparing for delivery"
                        : "Waiting for payment"}

                    </p>

                  </div>

                </div>

              </div>


              {/* ===========================================
                  BACK BUTTON
              ============================================ */}

              <button
                type="button"
                onClick={() =>
                  navigate("/orders")
                }
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.02]
                  px-5
                  py-3.5
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.16em]
                  text-gray-500
                  transition-all
                  duration-300
                  hover:border-white/[0.15]
                  hover:bg-white/[0.04]
                  hover:text-white
                "
              >

                <ArrowLeft
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-x-1
                  "
                />

                Back to Orders

              </button>

            </motion.div>

          </div>

        </div>

      </div>

    </section>
  );
}