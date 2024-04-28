// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  point: 0,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPoint: (state, action) => {
      state.point = action.payload;
    },
  },
});

export const { setPoint } = userSlice.actions;
export default userSlice.reducer;