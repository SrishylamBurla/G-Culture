// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import API from '../../api/axios';

// export const createOrder = createAsyncThunk(
//   'order/create',
//   async (orderData, { getState }) => {
//     const {
//       user: { userInfo },
//     } = getState();

//     if (!userInfo || !userInfo.token) {
//       throw new Error('Not logged in');
//     }

    

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userInfo.token}`, // <-- pass token
//       },
//     };

//     const { data } = await API.post('/orders', orderData, config);
//     return data;
//   }
// );


// const orderSlice = createSlice({
//   name: 'order',
//   initialState: { currentOrder: null, status: 'idle' },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createOrder.pending, (state) => { state.status = 'loading'; })
//       .addCase(createOrder.fulfilled, (state, action) => { state.status = 'succeeded'; state.currentOrder = action.payload; })
//       .addCase(createOrder.rejected, (state) => { state.status = 'failed'; });
//   }
// });

// export default orderSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

// Persisted user info from localStorage (in case of page refresh)
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Thunk to create an order
export const createOrder = createAsyncThunk(
  'order/create',
  async (orderData, { getState }) => {
    // Get userInfo from Redux state or fallback to localStorage
    const state = getState();
    const userInfo =
      state.user?.userInfo || userInfoFromStorage;

    if (!userInfo || !userInfo.token) {
      throw new Error('Not logged in');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`, // pass token
      },
    };

    const { data } = await API.post('/orders', orderData, config);
    return data;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: { currentOrder: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // store error message
      });
  },
});

export default orderSlice.reducer;
