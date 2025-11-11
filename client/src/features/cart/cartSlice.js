// import { createSlice } from '@reduxjs/toolkit';

// const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: { cartItems: storedCart },
//   reducers: {
//     addToCart: (state, action) => {
//       const item = action.payload;
//       const exist = state.cartItems.find(x => x.product === item.product);
//       if (exist) {
//         state.cartItems = state.cartItems.map(x => x.product === exist.product ? item : x);
//       } else {
//         state.cartItems.push(item);
//       }
//       localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
//     },
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter(x => x.product !== action.payload);
//       localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
//     },
//     clearCart: (state) => {
//       state.cartItems = [];
//       localStorage.removeItem('cartItems');
//     }
//   }
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: storedCart },
  reducers: {
    addToCart: (state, action) => {
  const item = action.payload; // includes _id, quantity, etc.
  const exist = state.cartItems.find(x => x._id === item._id);

  if (exist) {
    // ✅ Add selected quantity, not just +1
    state.cartItems = state.cartItems.map(x =>
      x._id === exist._id
        ? { ...x, quantity: x.quantity + item.quantity }
        : x
    );
  } else {
    // ✅ Add new product with selected quantity
    state.cartItems.push({ ...item, quantity: item.quantity || 1 });
  }

  localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
},


    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      state.cartItems = state.cartItems.map(x =>
        x._id === _id ? { ...x, quantity } : x
      );
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(x => x._id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
