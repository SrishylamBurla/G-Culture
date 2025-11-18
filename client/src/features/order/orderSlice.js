import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// Load user token from Redux or localStorage
const getToken = (state) => {
  const userInfo =
    state.user?.userInfo ||
    JSON.parse(localStorage.getItem("userInfo") || "null");

  return userInfo?.token || null;
};

//=====================================================
// 1️⃣ Create New Order
//=====================================================
export const createOrder = createAsyncThunk(
  "order/create",
  async (orderData, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      if (!token) throw new Error("Not logged in");

      const { data } = await API.post("/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

//=====================================================
// 2️⃣ Fetch Order By ID
//=====================================================
export const fetchOrderById = createAsyncThunk(
  "order/fetchOne",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());
      const { data } = await API.get(`/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

//=====================================================
// 3️⃣ Fetch My Orders
//=====================================================
export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());

      const { data } = await API.get("/orders/myorders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

//=====================================================
// 4️⃣ Fetch All Orders (Admin)
//=====================================================
export const fetchAllOrders = createAsyncThunk(
  "order/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());

      const { data } = await API.get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

//=====================================================
// 5️⃣ Mark Order as Paid
//=====================================================
export const updateOrderToPaid = createAsyncThunk(
  "order/updatePaid",
  async ({ id, payment }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());

      const { data } = await API.put(
        `/orders/${id}/pay`,
        payment,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

//=====================================================
// 6️⃣ Mark Order as Delivered (Admin)
//=====================================================
export const updateOrderToDelivered = createAsyncThunk(
  "order/updateDelivered",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());

      const { data } = await API.put(
        `/orders/${id}/deliver`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

//=====================================================
// 7️⃣ Cancel Order
//=====================================================
export const cancelOrder = createAsyncThunk(
  "order/cancel",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState());

      const { data } = await API.put(
        `/orders/${id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);



//=====================================================
// Slice
//=====================================================
const orderSlice = createSlice({
  name: "order",
  initialState: {
    currentOrder: null,
    myOrders: [],
    allOrders: [],
    selectedOrder: null,

    status: "idle",
    myOrderStatus: "idle",
    adminStatus: "idle",
    payStatus: "idle",
    deliverStatus: "idle",
    cancelStatus: "idle",

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch Order by ID
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      })

      // Fetch My Orders
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.myOrders = action.payload;
      })

      // Fetch All Orders (Admin)
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload;
      })

      // Pay Order
      .addCase(updateOrderToPaid.fulfilled, (state, action) => {
        state.payStatus = "succeeded";
        state.selectedOrder = action.payload;
      })

      // Deliver Order
      .addCase(updateOrderToDelivered.fulfilled, (state, action) => {
        state.deliverStatus = "succeeded";
        state.selectedOrder = action.payload;
      })

      // Cancel Order
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelStatus = "succeeded";
        state.selectedOrder = action.payload;
      })

  },
});

export default orderSlice.reducer;
