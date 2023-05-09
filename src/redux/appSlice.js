import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {},
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      return { ...state, admin: action.payload };
    },
  },
});

export const { setAdmin } = appSlice.actions;

export default appSlice.reducer;
