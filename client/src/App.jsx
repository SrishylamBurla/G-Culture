import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingProfileButton from "./components/FloatingProfileButton";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import StreetwearPage from "./pages/StreetwearPage";
import CasualwearPage from "./pages/CasualwearPage";
import CapsPage from "./pages/CapsPage";
import ChestbagsPage from "./pages/ChestbagsPage";
import MobileMenu from "./components/MobileMenu";
import { PhoneSignIn } from "./pages/PhoneSignIn";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

import AdminRoutes from "./routes/AdminRoutes";
import AdminLayout from "./layouts/AdminLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AddProduct from "./components/admin/AddProduct";
import EditProduct from "./components/admin/EditProduct";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen text-white">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {menuOpen && <MobileMenu setMenuOpen={setMenuOpen} />}

        <Toaster
          position="top-right"
          reverseOrder={false}
          containerStyle={{ zIndex: 999999 }}
          toastOptions={{
            duration: 2200,
            style: {
              background: "rgba(0,0,0,0.85)",
              color: "#fff",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(6px)",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/order/:id" element={<OrderDetailsPage />} />
            <Route path="/order-success/:id" element={<OrderSuccessPage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="phone-login" element={<PhoneSignIn />} />

            {/* Protected Routes */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Category Routes */}
            <Route path="/streetwear" element={<StreetwearPage />} />
            <Route path="/casualwear" element={<CasualwearPage />} />
            <Route path="/caps" element={<CapsPage />} />
            <Route path="/chestbags" element={<ChestbagsPage />} />

            {/* Wishlist */}
            <Route path="/wishlist" element={<WishlistPage />} />

            <Route
              path="/admin"
              element={
                <AdminRoutes>
                  <AdminLayout />
                </AdminRoutes>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="products/:id/edit" element={<EditProduct />} />
              <Route path="orders/:id" element={<AdminOrderDetails />} />
            </Route>
          </Routes>
        </main>

        {/* Floating Profile + Footer */}
        <FloatingProfileButton />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
