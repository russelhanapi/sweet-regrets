import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    writeFullName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { writeFullName } = userSlice.actions;
export default userSlice.reducer;
