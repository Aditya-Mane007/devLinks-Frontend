import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: "Links",
};

export const TabSlice = createSlice({
  name: "Tab",
  initialState,
  reducers: {
    tabHandler: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const { tabHandler } = TabSlice.actions;

export default TabSlice.reducer;
