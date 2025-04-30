import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { calculateDistanceFromBakery } from '../../services/apiGoogleMaps';
import {
  BAKERY_LOCATION,
  STANDARD_DELIVERY_FEE,
  MAX_BASE_DISTANCE_KM,
  EXTRA_CHARGE_PER_KM,
} from '../../config/constants';

const initialState = {
  deliveryFee: 0,
  distanceInKm: 0,
  status: 'idle',
  error: '',
};

export const fetchDeliveryFee = createAsyncThunk(
  'order/fetchDeliveryFee',
  async function (userLocation, { rejectWithValue }) {
    try {
      let deliveryFee = STANDARD_DELIVERY_FEE;

      const distanceInKm = await calculateDistanceFromBakery(
        BAKERY_LOCATION,
        userLocation,
      );

      // Add extra charges if distance exceeds threshold
      if (distanceInKm > MAX_BASE_DISTANCE_KM) {
        deliveryFee += Math.ceil(
          (distanceInKm - MAX_BASE_DISTANCE_KM) * EXTRA_CHARGE_PER_KM,
        );
      }

      return { distanceInKm, deliveryFee };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    // Resets the delivery fee state when switching from delivery to pickup
    resetDeliveryFee(state) {
      state.deliveryFee = 0;
      state.distanceInKm = 0;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchDeliveryFee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeliveryFee.fulfilled, (state, action) => {
        state.deliveryFee = action.payload.deliveryFee;
        state.distanceInKm = action.payload.distanceInKm;
        state.status = 'idle';
        state.error = '';
      })
      .addCase(fetchDeliveryFee.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      }),
});

export const getDeliveryFee = (state) => state.order.deliveryFee;
export const { resetDeliveryFee } = orderSlice.actions;
export default orderSlice.reducer;
