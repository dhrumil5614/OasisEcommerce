import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as cartService from '../../services/cartService';

const initialState = {
  cart: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get cart
export const getCart = createAsyncThunk(
  'cart/get',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.getCart(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add to cart
export const addToCart = createAsyncThunk(
  'cart/add',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.addToCart(data, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update cart item
export const updateCartItem = createAsyncThunk(
  'cart/update',
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.updateCartItem(productId, quantity, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove from cart
export const removeFromCart = createAsyncThunk(
  'cart/remove',
  async (productId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.removeFromCart(productId, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Clear cart
export const clearCart = createAsyncThunk(
  'cart/clear',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.clearCart(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
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
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload.data;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      });
  },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;
