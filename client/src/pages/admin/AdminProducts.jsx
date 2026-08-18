import { Link } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../../features/products/productApi";

import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import {
  Package,
  Plus,
  Search,
  X,
  Pencil,
  Trash2,
  AlertTriangle,
  Layers3,
  CheckCircle2,
  CircleOff,
  ArrowUpRight,
  Tag,
} from "lucide-react";

export default function AdminProducts() {
  const {
    data: products = [],
    isLoading,
  } = useGetAllProductsQuery();

  const [deleteProduct] =
    useDeleteProductMutation();

  const [deletingId, setDeletingId] =
    useState(null);

  const [deletingProduct, setDeletingProduct] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("all");

  /* =========================================================
     CATEGORIES
  ========================================================= */

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

    return uniqueCategories.sort();
  }, [products]);

  /* =========================================================
     FILTER PRODUCTS
  ========================================================= */

  const filteredProducts = useMemo(() => {
    const search = searchTerm
      .toLowerCase()
      .trim();

    return products.filter((product) => {
      const matchesSearch =
        !search ||
        product.name
          ?.toLowerCase()
          .includes(search) ||
        product.slug
          ?.toLowerCase()
          .includes(search) ||
        product.category
          ?.toLowerCase()
          .includes(search);

      const matchesCategory =
        categoryFilter === "all" ||
        product.category === categoryFilter;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [
    products,
    searchTerm,
    categoryFilter,
  ]);

  /* =========================================================
     STATS
  ========================================================= */

  const inStockCount = products.filter(
    (product) =>
      Number(product.countInStock || 0) > 0
  ).length;

  const outOfStockCount =
    products.length - inStockCount;

  const offerCount = products.filter(
    (product) =>
      Number(product.offerPrice || 0) > 0 &&
      Number(product.offerPrice) <
        Number(product.price || 0)
  ).length;

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async () => {
    if (!deletingProduct) return;

    const id = deletingProduct._id;

    try {
      setDeletingId(id);

      await deleteProduct(id).unwrap();

      toast.success(
        "Product deleted successfully"
      );

      setDeletingProduct(null);
    } catch (err) {
      toast.error(
        err?.data?.message ||
          "Failed to delete product"
      );

      console.error(err);
    } finally {
      setDeletingId(null);
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
            <div className="h-7 w-36 animate-pulse rounded-lg bg-gray-200" />

            <div className="h-4 w-72 animate-pulse rounded bg-gray-200" />
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

          <div className="h-[520px] animate-pulse rounded-2xl bg-white shadow-sm" />

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
              Products
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your catalog, pricing and inventory.
            </p>

          </div>

          <Link
            to="/admin/products/add"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#111114] px-5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-black hover:shadow-md active:scale-[0.98]"
          >
            <Plus size={16} />
            Add Product
          </Link>

        </div>

        {/* =====================================================
            SUMMARY CARDS
        ====================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <SummaryCard
            icon={Package}
            label="Total Products"
            value={products.length}
            description="Products in catalog"
          />

          <SummaryCard
            icon={CheckCircle2}
            label="In Stock"
            value={inStockCount}
            description="Currently available"
            iconClass="text-emerald-600"
            bgClass="bg-emerald-50"
          />

          <SummaryCard
            icon={CircleOff}
            label="Out of Stock"
            value={outOfStockCount}
            description="Need inventory attention"
            iconClass="text-red-500"
            bgClass="bg-red-50"
          />

          <SummaryCard
            icon={Tag}
            label="On Offer"
            value={offerCount}
            description="Products with discounts"
            iconClass="text-violet-600"
            bgClass="bg-violet-50"
          />

        </div>

        {/* =====================================================
            PRODUCT MANAGEMENT
        ====================================================== */}

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* ===================================================
              TOOLBAR
          ==================================================== */}

          <div className="flex flex-col gap-4 border-b border-gray-100 p-5">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h2 className="text-base font-semibold text-gray-900">
                  Product Catalog
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1
                    ? "product"
                    : "products"}{" "}
                  displayed
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
                  placeholder="Search products..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-10 pr-10 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-900/[0.04]"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearchTerm("")
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 transition-colors hover:text-gray-700"
                  >
                    <X size={15} />
                  </button>
                )}

              </div>

            </div>

            {/* =================================================
                FILTERS
            ================================================== */}

            <div className="flex items-center gap-2 overflow-x-auto pb-1">

              <FilterButton
                active={
                  categoryFilter === "all"
                }
                onClick={() =>
                  setCategoryFilter("all")
                }
              >
                All
              </FilterButton>

              {categories.map(
                (category) => (
                  <FilterButton
                    key={category}
                    active={
                      categoryFilter ===
                      category
                    }
                    onClick={() =>
                      setCategoryFilter(
                        category
                      )
                    }
                  >
                    {category}
                  </FilterButton>
                )
              )}

            </div>

          </div>

          {/* ===================================================
              DESKTOP TABLE
          ==================================================== */}

          <div className="hidden overflow-x-auto md:block">

            <table className="w-full min-w-[900px] text-left">

              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">

                  <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                    Product
                  </th>

                  <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                    Category
                  </th>

                  <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                    Price
                  </th>

                  <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                    Inventory
                  </th>

                  <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                    Status
                  </th>

                  <th className="px-5 py-3.5 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredProducts.map(
                  (product) => (
                    <DesktopProductRow
                      key={product._id}
                      product={product}
                      deletingId={deletingId}
                      onDelete={() =>
                        setDeletingProduct(
                          product
                        )
                      }
                    />
                  )
                )}

              </tbody>

            </table>

          </div>

          {/* ===================================================
              MOBILE PRODUCTS
          ==================================================== */}

          <div className="divide-y divide-gray-100 md:hidden">

            {filteredProducts.map(
              (product) => (
                <MobileProductCard
                  key={product._id}
                  product={product}
                  deletingId={deletingId}
                  onDelete={() =>
                    setDeletingProduct(
                      product
                    )
                  }
                />
              )
            )}

          </div>

          {/* ===================================================
              EMPTY
          ==================================================== */}

          {filteredProducts.length ===
            0 && (
            <div className="flex min-h-[320px] flex-col items-center justify-center px-5 text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50">
                <Package
                  size={23}
                  className="text-gray-300"
                />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-gray-700">
                No products found
              </h3>

              <p className="mt-1 max-w-xs text-xs leading-5 text-gray-400">
                Try changing your search or
                category filter.
              </p>

              {(searchTerm ||
                categoryFilter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter(
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

        </section>

      </div>

      {/* =======================================================
          DELETE MODAL
      ======================================================== */}

      {deletingProduct && (
        <DeleteProductModal
          product={deletingProduct}
          deleting={
            deletingId ===
            deletingProduct._id
          }
          onClose={() =>
            setDeletingProduct(null)
          }
          onConfirm={handleDelete}
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

        <ArrowUpRight
          size={14}
          className="text-gray-200 transition-colors group-hover:text-gray-400"
        />

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
        capitalize
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
   DESKTOP PRODUCT ROW
============================================================= */

function DesktopProductRow({
  product,
  deletingId,
  onDelete,
}) {
  const price = Number(
    product.price || 0
  );

  const offerPrice = Number(
    product.offerPrice || 0
  );

  const hasOffer =
    offerPrice > 0 &&
    offerPrice < price;

  const stock = Number(
    product.countInStock || 0
  );

  return (
    <tr className="group border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50/70">

      {/* PRODUCT */}

      <td className="px-5 py-4">

        <div className="flex items-center gap-3">

          <ProductImage
            product={product}
          />

          <div className="min-w-0">

            <p className="max-w-[260px] truncate text-sm font-medium text-gray-800">
              {product.name}
            </p>

            <p className="mt-1 max-w-[260px] truncate font-mono text-[10px] text-gray-400">
              {product.slug}
            </p>

          </div>

        </div>

      </td>

      {/* CATEGORY */}

      <td className="px-5 py-4">

        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1 text-[10px] font-semibold capitalize text-gray-500">

          <Layers3 size={10} />

          {product.category ||
            "Uncategorized"}

        </span>

      </td>

      {/* PRICE */}

      <td className="px-5 py-4">

        {hasOffer ? (
          <div>

            <p className="text-sm font-semibold text-gray-900">
              ₹
              {offerPrice.toLocaleString(
                "en-IN"
              )}
            </p>

            <p className="mt-0.5 text-[10px] text-gray-400 line-through">
              ₹
              {price.toLocaleString(
                "en-IN"
              )}
            </p>

          </div>
        ) : (
          <p className="text-sm font-semibold text-gray-900">
            ₹
            {price.toLocaleString(
              "en-IN"
            )}
          </p>
        )}

      </td>

      {/* INVENTORY */}

      <td className="px-5 py-4">

        <p className="text-sm font-medium text-gray-700">
          {stock}
        </p>

        <p className="mt-0.5 text-[10px] text-gray-400">
          units
        </p>

      </td>

      {/* STATUS */}

      <td className="px-5 py-4">

        <StockBadge stock={stock} />

      </td>

      {/* ACTIONS */}

      <td className="px-5 py-4">

        <div className="flex justify-end gap-2 opacity-80 transition-opacity group-hover:opacity-100">

          <Link
            to={`/admin/products/${product._id}/edit`}
            title="Edit product"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          >
            <Pencil
              size={14}
              strokeWidth={1.7}
            />
          </Link>

          <button
            type="button"
            title="Delete product"
            onClick={onDelete}
            disabled={
              deletingId === product._id
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 transition-all hover:border-red-200 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2
              size={14}
              strokeWidth={1.7}
            />
          </button>

        </div>

      </td>

    </tr>
  );
}

/* =============================================================
   MOBILE PRODUCT CARD
============================================================= */

function MobileProductCard({
  product,
  deletingId,
  onDelete,
}) {
  const price = Number(
    product.price || 0
  );

  const offerPrice = Number(
    product.offerPrice || 0
  );

  const hasOffer =
    offerPrice > 0 &&
    offerPrice < price;

  const stock = Number(
    product.countInStock || 0
  );

  return (
    <div className="p-4">

      <div className="flex gap-3">

        <ProductImage
          product={product}
          mobile
        />

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-3">

            <div className="min-w-0">

              <p className="truncate text-sm font-medium text-gray-800">
                {product.name}
              </p>

              <p className="mt-1 text-[10px] capitalize text-gray-400">
                {product.category ||
                  "Uncategorized"}
              </p>

            </div>

            <StockBadge stock={stock} />

          </div>

          <div className="mt-3 flex items-end justify-between">

            <div>

              {hasOffer ? (
                <div className="flex items-baseline gap-2">

                  <span className="text-sm font-semibold text-gray-900">
                    ₹
                    {offerPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <span className="text-[10px] text-gray-400 line-through">
                    ₹
                    {price.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>
              ) : (
                <span className="text-sm font-semibold text-gray-900">
                  ₹
                  {price.toLocaleString(
                    "en-IN"
                  )}
                </span>
              )}

              <p className="mt-1 text-[10px] text-gray-400">
                {stock} units available
              </p>

            </div>

            <div className="flex items-center gap-1">

              <Link
                to={`/admin/products/${product._id}/edit`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400"
              >
                <Pencil size={14} />
              </Link>

              <button
                type="button"
                onClick={onDelete}
                disabled={
                  deletingId ===
                  product._id
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 disabled:opacity-50"
              >
                <Trash2 size={14} />
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

/* =============================================================
   PRODUCT IMAGE
============================================================= */

function ProductImage({
  product,
  mobile = false,
}) {
  return (
    <div
      className={`
        shrink-0
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-gray-50
        ${
          mobile
            ? "h-20 w-20"
            : "h-14 w-14"
        }
      `}
    >
      {product.images?.[0] ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Package
            size={18}
            className="text-gray-300"
          />
        </div>
      )}
    </div>
  );
}

/* =============================================================
   STOCK BADGE
============================================================= */

function StockBadge({ stock }) {
  if (stock > 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">

        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

        In Stock

      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-600">

      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

      Out of Stock

    </span>
  );
}

/* =============================================================
   DELETE PRODUCT MODAL
============================================================= */

function DeleteProductModal({
  product,
  deleting,
  onClose,
  onConfirm,
}) {
  return (
    <div
      className="fixed inset-0 z-[100001] flex items-center justify-center bg-black/65 px-4 backdrop-blur-md"
      onMouseDown={onClose}
    >

      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-red-100 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.3)]"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >

        {/* TOP ACCENT */}

        <div className="absolute left-0 right-0 top-0 h-1 bg-red-500" />

        <div className="p-6 sm:p-7">

          {/* HEADER */}

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">

              <AlertTriangle
                size={20}
                className="text-red-500"
              />

            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={deleting}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50"
            >
              <X size={16} />
            </button>

          </div>

          {/* CONTENT */}

          <div className="mt-6">

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-500/70">
              Destructive Action
            </p>

            <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-gray-900">
              Delete this product?
            </h3>

            <p className="mt-2 text-[13px] leading-5 text-gray-500">
              This product will be permanently removed
              from your catalog. This action cannot be
              undone.
            </p>

          </div>

          {/* PRODUCT PREVIEW */}

          <div className="mt-5 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">

            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white">

              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Package
                    size={17}
                    className="text-gray-300"
                  />
                </div>
              )}

            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-medium text-gray-800">
                {product.name}
              </p>

              <p className="mt-1 text-[11px] capitalize text-gray-400">
                {product.category ||
                  "Uncategorized"}
              </p>

              <p className="mt-1 text-xs font-semibold text-gray-700">
                ₹
                {Number(
                  product.offerPrice ||
                    product.price ||
                    0
                ).toLocaleString(
                  "en-IN"
                )}
              </p>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="mt-6 flex gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={deleting}
              className="flex-1 rounded-xl border border-gray-200 py-3 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={deleting}
              className="flex-1 rounded-xl bg-red-500 py-3 text-xs font-semibold text-white transition-all hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleting
                ? "Deleting..."
                : "Delete Product"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}