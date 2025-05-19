const { configureStore } = require("@reduxjs/toolkit");
import TabReducer from "@/features/tab/tabSlice";

export const store = configureStore({
  reducer: {
    tab: TabReducer,
  },
});
