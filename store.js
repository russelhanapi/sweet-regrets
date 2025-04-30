import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './src/features/cart/cartSlice';
import userReducer from './src/features/user/userSlice';
import orderReducer from './src/features/order/orderSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  },
});
