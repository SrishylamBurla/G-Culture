import { useState } from "react";
import { useCreateProductMutation } from "../../features/products/productApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  Package,
  Tag,
  IndianRupee,
  Image as ImageIcon,
  FileText,
  Boxes,
  ArrowLeft,
  Plus,
  Eye,
  Sparkles,
} from "lucide-react";

export default function AddProduct() {
  const navigate = useNavigate();

  const [
    createProduct,
    { isLoading },
  ] = useCreateProductMutation();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    offerPrice: "",
    category: "",
    subcategory: "",
    sizes: "",
    colors: "",
    stock: "",
    images: "",
  });

  const [autoSlug, setAutoSlug] =
    useState(true);

  /* =========================================================
     INPUT CLASS
  ========================================================= */

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-[13px] leading-5 text-gray-700 outline-none transition-all placeholder:text-gray-300 focus:border-gray-400 focus:ring-4 focus:ring-gray-900/[0.04]";

  /* =========================================================
     SLUG GENERATOR
  ========================================================= */

  const createSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  /* =========================================================
     HANDLE CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "name" &&
      autoSlug
    ) {
      setForm((prev) => ({
        ...prev,
        name: value,
        slug: createSlug(value),
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     IMAGE URLS
  ========================================================= */

  const imageUrls = form.images
    .split(",")
    .map((img) => img.trim())
    .filter(Boolean);

  /* =========================================================
     PRICE
  ========================================================= */

  const price =
    Number(form.price) || 0;

  const offerPrice =
    Number(form.offerPrice) || 0;

  const offerPercentage =
    price > offerPrice &&
    offerPrice > 0
      ? Math.round(
          ((price - offerPrice) /
            price) *
            100
        )
      : 0;

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error(
        "Product name is required"
      );
      return;
    }

    if (!form.slug.trim()) {
      toast.error(
        "Product slug is required"
      );
      return;
    }

    if (!form.price) {
      toast.error(
        "Product price is required"
      );
      return;
    }

    if (!form.category.trim()) {
      toast.error(
        "Category is required"
      );
      return;
    }

    if (offerPrice > 0 && offerPrice >= price) {
      toast.error(
        "Offer price must be lower than regular price"
      );
      return;
    }

    const payload = {
      ...form,

      price: Number(form.price),

      offerPrice:
        form.offerPrice
          ? Number(form.offerPrice)
          : 0,

      stock:
        form.stock
          ? Number(form.stock)
          : 0,

      sizes: form.sizes
        .split(",")
        .map((size) => size.trim())
        .filter(Boolean),

      colors: form.colors
        .split(",")
        .map((color) => color.trim())
        .filter(Boolean),

      images: form.images
        .split(",")
        .map((image) => image.trim())
        .filter(Boolean),
    };

    try {
      await createProduct(
        payload
      ).unwrap();

      toast.success(
        "Product created successfully"
      );

      navigate("/admin/products");
    } catch (err) {
      console.error(
        "Create product error:",
        err
      );

      toast.error(
        err?.data?.message ||
          "Failed to create product"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#111114]">

      <div className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-7">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/products"
              )
            }
            className="mb-5 inline-flex items-center gap-2 text-[11px] font-medium text-gray-400 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={14} />
            Back to Products
          </button>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white">
                  <Plus size={15} />
                </span>

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Product Management
                </p>

              </div>

              <h1 className="text-[28px] font-semibold tracking-tight text-gray-900 sm:text-[32px]">
                Add Product
              </h1>

              <p className="mt-1.5 text-[13px] text-gray-500">
                Create a new product for your G-Culture store.
              </p>

            </div>

            {offerPercentage > 0 && (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">

                <Sparkles
                  size={16}
                  className="text-emerald-500"
                />

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
                    Current Offer
                  </p>

                  <p className="text-[12px] font-semibold text-emerald-700">
                    {offerPercentage}% OFF
                  </p>

                </div>

              </div>
            )}

          </div>

        </div>

        {/* =====================================================
            FORM
        ====================================================== */}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_350px]"
        >

          {/* ===================================================
              LEFT COLUMN
          ==================================================== */}

          <div className="space-y-6">

            {/* =================================================
                BASIC INFORMATION
            ================================================== */}

            <FormSection
              icon={Package}
              title="Basic Information"
              description="Product identity and general information."
            >

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <FormField
                  label="Product Name"
                  required
                  hint="Customer-facing name"
                >
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Oversized Graphic T-Shirt"
                    className={inputClass}
                  />
                </FormField>

                <FormField
                  label="Product Slug"
                  required
                  hint="Used in product URL"
                >

                  <input
                    required
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="oversized-graphic-t-shirt"
                    className={inputClass}
                  />

                  <label className="mt-2.5 flex cursor-pointer items-center gap-2">

                    <input
                      type="checkbox"
                      checked={autoSlug}
                      onChange={(e) =>
                        setAutoSlug(
                          e.target.checked
                        )
                      }
                      className="h-3.5 w-3.5 rounded border-gray-300 accent-black"
                    />

                    <span className="text-[10px] text-gray-400">
                      Automatically generate slug
                    </span>

                  </label>

                </FormField>

                <FormField
                  label="Category"
                  required
                >
                  <input
                    required
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Streetwear"
                    className={inputClass}
                  />
                </FormField>

                <FormField
                  label="Subcategory"
                  hint="Optional"
                >
                  <input
                    name="subcategory"
                    value={form.subcategory}
                    onChange={handleChange}
                    placeholder="T-Shirts"
                    className={inputClass}
                  />
                </FormField>

              </div>

            </FormSection>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <FormSection
              icon={FileText}
              title="Description"
              description="Describe the product clearly for customers."
            >

              <textarea
                required
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={7}
                placeholder="Write a detailed product description..."
                className={`${inputClass} resize-none`}
              />

              <div className="mt-2 flex justify-end">

                <span className="text-[10px] text-gray-400">
                  {form.description.length} characters
                </span>

              </div>

            </FormSection>

            {/* =================================================
                PRICING
            ================================================== */}

            <FormSection
              icon={IndianRupee}
              title="Pricing"
              description="Set the regular and promotional prices."
            >

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <FormField
                  label="Regular Price"
                  required
                >

                  <div className="relative">

                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-gray-400">
                      ₹
                    </span>

                    <input
                      required
                      name="price"
                      type="number"
                      min="0"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="0"
                      className={`${inputClass} pl-8`}
                    />

                  </div>

                </FormField>

                <FormField
                  label="Offer Price"
                  hint="Optional"
                >

                  <div className="relative">

                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-gray-400">
                      ₹
                    </span>

                    <input
                      name="offerPrice"
                      type="number"
                      min="0"
                      value={form.offerPrice}
                      onChange={handleChange}
                      placeholder="0"
                      className={`${inputClass} pl-8`}
                    />

                  </div>

                </FormField>

              </div>

              {offerPercentage > 0 && (
                <div className="mt-4 flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">

                  <span className="text-[11px] font-medium text-gray-400">
                    Customer discount
                  </span>

                  <span className="text-[12px] font-semibold text-emerald-600">
                    {offerPercentage}% OFF
                  </span>

                </div>
              )}

            </FormSection>

            {/* =================================================
                INVENTORY
            ================================================== */}

            <FormSection
              icon={Boxes}
              title="Inventory"
              description="Manage stock and available product variants."
            >

              <div className="space-y-5">

                <FormField
                  label="Stock Quantity"
                  required
                >

                  <input
                    required
                    name="stock"
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="0"
                    className={inputClass}
                  />

                </FormField>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <FormField
                    label="Sizes"
                    hint="Comma separated"
                  >

                    <input
                      name="sizes"
                      value={form.sizes}
                      onChange={handleChange}
                      placeholder="S, M, L, XL"
                      className={inputClass}
                    />

                    <TagPreview
                      values={form.sizes}
                    />

                  </FormField>

                  <FormField
                    label="Colors"
                    hint="Comma separated"
                  >

                    <input
                      name="colors"
                      value={form.colors}
                      onChange={handleChange}
                      placeholder="Black, White, Red"
                      className={inputClass}
                    />

                    <TagPreview
                      values={form.colors}
                    />

                  </FormField>

                </div>

              </div>

            </FormSection>

            {/* =================================================
                IMAGES
            ================================================== */}

            <FormSection
              icon={ImageIcon}
              title="Product Images"
              description="Add image URLs separated by commas."
            >

              <textarea
                name="images"
                value={form.images}
                onChange={handleChange}
                rows={4}
                placeholder="https://example.com/image-1.jpg, https://example.com/image-2.jpg"
                className={`${inputClass} resize-none`}
              />

              {imageUrls.length > 0 && (
                <div className="mt-5">

                  <div className="mb-3 flex items-center justify-between">

                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Image Preview
                    </p>

                    <span className="text-[10px] text-gray-400">
                      {imageUrls.length}{" "}
                      {imageUrls.length ===
                      1
                        ? "image"
                        : "images"}
                    </span>

                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                    {imageUrls
                      .slice(0, 8)
                      .map(
                        (url, index) => (
                          <div
                            key={`${url}-${index}`}
                            className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
                          >

                            <img
                              src={url}
                              alt={`Product preview ${
                                index + 1
                              }`}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-[9px] font-medium text-white backdrop-blur-md">
                              {index + 1}
                            </span>

                          </div>
                        )
                      )}

                  </div>

                </div>
              )}

            </FormSection>

          </div>

          {/* ===================================================
              RIGHT COLUMN
          ==================================================== */}

          <div className="space-y-6">

            {/* =================================================
                PRODUCT PREVIEW
            ================================================== */}

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="border-b border-gray-100 p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white">
                    <Eye size={16} />
                  </div>

                  <div>

                    <h2 className="text-[15px] font-semibold text-gray-900">
                      Product Preview
                    </h2>

                    <p className="mt-0.5 text-[11px] text-gray-400">
                      Live product summary
                    </p>

                  </div>

                </div>

              </div>

              <div className="p-5">

                {/* IMAGE */}

                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-100">

                  {imageUrls[0] ? (
                    <img
                      src={imageUrls[0]}
                      alt="Product preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-center">

                      <ImageIcon
                        size={28}
                        className="text-gray-300"
                      />

                      <p className="mt-3 text-[11px] text-gray-400">
                        Add an image URL
                      </p>

                    </div>
                  )}

                  {offerPercentage >
                    0 && (
                    <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-black shadow-sm">
                      {offerPercentage}% Off
                    </span>
                  )}

                </div>

                {/* PRODUCT DETAILS */}

                <div className="mt-5">

                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                    {form.category ||
                      "Category"}
                  </p>

                  <h3 className="mt-1.5 line-clamp-2 text-[17px] font-semibold leading-6 text-gray-900">
                    {form.name ||
                      "Product Name"}
                  </h3>

                  <div className="mt-4 flex items-end gap-2">

                    <span className="text-[20px] font-semibold text-gray-900">
                      ₹
                      {offerPrice >
                        0 &&
                      offerPrice <
                        price
                        ? offerPrice.toLocaleString(
                            "en-IN"
                          )
                        : price
                          ? price.toLocaleString(
                              "en-IN"
                            )
                          : "0"}
                    </span>

                    {offerPrice >
                      0 &&
                      offerPrice <
                        price && (
                        <span className="pb-0.5 text-[12px] text-gray-400 line-through">
                          ₹
                          {price.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      )}

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                QUICK INFO
            ================================================== */}

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50">
                  <Tag
                    size={16}
                    className="text-gray-500"
                  />
                </div>

                <div>

                  <h2 className="text-[15px] font-semibold text-gray-900">
                    Quick Info
                  </h2>

                  <p className="mt-0.5 text-[11px] text-gray-400">
                    Product configuration
                  </p>

                </div>

              </div>

              <div className="divide-y divide-gray-100">

                <InfoRow
                  label="Category"
                  value={
                    form.category ||
                    "Not set"
                  }
                />

                <InfoRow
                  label="Subcategory"
                  value={
                    form.subcategory ||
                    "Not set"
                  }
                />

                <InfoRow
                  label="Stock"
                  value={
                    form.stock
                      ? `${form.stock} units`
                      : "Not set"
                  }
                />

                <InfoRow
                  label="Images"
                  value={`${imageUrls.length}`}
                />

              </div>

            </div>

            {/* =================================================
                ACTIONS
            ================================================== */}

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

              <button
                type="submit"
                disabled={isLoading}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 text-[12px] font-semibold text-white transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
              >

                {isLoading ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    Creating Product...
                  </>
                ) : (
                  <>
                    <Plus size={15} />

                    Create Product
                  </>
                )}

              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={() =>
                  navigate(
                    "/admin/products"
                  )
                }
                className="mt-2 flex h-10 w-full items-center justify-center rounded-xl text-[12px] font-medium text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700"
              >
                Cancel
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}

/* =============================================================
   FORM SECTION
============================================================= */

function FormSection({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b border-gray-100 px-5 py-4 sm:px-6">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50">
            <Icon
              size={16}
              strokeWidth={1.7}
              className="text-gray-500"
            />
          </div>

          <div>

            <h2 className="text-[15px] font-semibold text-gray-900">
              {title}
            </h2>

            <p className="mt-0.5 text-[11px] text-gray-400">
              {description}
            </p>

          </div>

        </div>

      </div>

      <div className="p-5 sm:p-6">
        {children}
      </div>

    </section>
  );
}

/* =============================================================
   FORM FIELD
============================================================= */

function FormField({
  label,
  required,
  hint,
  children,
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between gap-2">

        <label className="text-[12px] font-semibold text-gray-700">

          {label}

          {required && (
            <span className="ml-1 text-red-400">
              *
            </span>
          )}

        </label>

        {hint && (
          <span className="text-[10px] text-gray-400">
            {hint}
          </span>
        )}

      </div>

      {children}

    </div>
  );
}

/* =============================================================
   TAG PREVIEW
============================================================= */

function TagPreview({
  values,
}) {
  const items = values
    .split(",")
    .map((item) =>
      item.trim()
    )
    .filter(Boolean);

  if (!items.length) {
    return null;
  }

  return (
    <div className="mt-2.5 flex flex-wrap gap-1.5">

      {items.map(
        (item, index) => (
          <span
            key={`${item}-${index}`}
            className="rounded-md bg-gray-100 px-2.5 py-1.5 text-[10px] font-medium text-gray-500"
          >
            {item}
          </span>
        )
      )}

    </div>
  );
}

/* =============================================================
   INFO ROW
============================================================= */

function InfoRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">

      <span className="text-[11px] text-gray-400">
        {label}
      </span>

      <span className="max-w-[180px] truncate text-right text-[11px] font-medium capitalize text-gray-700">
        {value}
      </span>

    </div>
  );
}