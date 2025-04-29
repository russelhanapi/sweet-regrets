import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserGeolocation } from '../../services/apiGeolocation';
import { getUserAddress } from '../../services/apiGoogleMaps';

const initialState = {
  fullName: '',
  status: 'idle',
  error: '',
  geolocation: {},
  address: '',
};

export const fetchUserAddress = createAsyncThunk(
  'user/fetchUserAddress',
  async function (_, { rejectWithValue }) {
    try {
      // Geolocation
      const geolocation = await getUserGeolocation();
      const { latitude, longitude } = geolocation.coords;

      // Reverse
      const address = await getUserAddress(latitude, longitude);

      return { geolocation: { latitude, longitude }, address };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    writeFullName(state, action) {
      state.fullName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchUserAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserAddress.fulfilled, (state, action) => {
        state.geolocation = action.payload.geolocation;
        state.address = action.payload.address;
        state.status = 'idle';
        state.error = '';
      })
      .addCase(fetchUserAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      }),
});

export const { writeFullName } = userSlice.actions;
export default userSlice.reducer;
