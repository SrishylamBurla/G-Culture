import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice";
import productsReducer from "../features/products/productSlice";
import orderReducer from "../features/order/orderSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
    order: orderReducer,
    wishlist: wishlistReducer,
  },
});
