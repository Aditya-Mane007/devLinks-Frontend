const { configureStore } = require("@reduxjs/toolkit");
import TabReducer from "@/features/tab/tabSlice";
import LinkReducer from "@/features/Links/linkSlice";

export const store = configureStore({
  reducer: {
    tab: TabReducer,
    link: LinkReducer,
  },
});
