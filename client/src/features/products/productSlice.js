import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get('/products');
      return Array.isArray(data) ? data : data.products || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
