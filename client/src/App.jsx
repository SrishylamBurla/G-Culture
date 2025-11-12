import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingProfileButton from "./components/FloatingProfileButton";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

// Pages
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

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
    <Toaster position="top-right" reverseOrder={false} />
        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            {/* General Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search" element={<SearchPage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

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

            {/* Category Pages */}
            <Route path="/men/streetwear" element={<StreetwearPage />} />
            <Route path="/men/casualwear" element={<CasualwearPage />} />
            <Route path="/men/caps" element={<CapsPage />} />
            <Route path="/men/chestbags" element={<ChestbagsPage />} />

            {/* Wishlist */}
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </main>

        {/* Floating & Footer */}
        <FloatingProfileButton />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

