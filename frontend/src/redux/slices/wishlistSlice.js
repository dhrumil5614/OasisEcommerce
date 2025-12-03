import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as wishlistService from '../../services/wishlistService';

const initialState = {
  wishlist: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get wishlist
export const getWishlist = createAsyncThunk(
  'wishlist/get',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await wishlistService.getWishlist(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add to wishlist
export const addToWishlist = createAsyncThunk(
  'wishlist/add',
  async (productId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await wishlistService.addToWishlist(productId, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  'wishlist/remove',
  async (productId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await wishlistService.removeFromWishlist(productId, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload.data;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload.data;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload.data;
      });
  },
});

export const { reset } = wishlistSlice.actions;
export default wishlistSlice.reducer;
