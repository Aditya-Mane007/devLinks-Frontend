const { configureStore } = require("@reduxjs/toolkit");
import TabReducer from "@/features/tab/tabSlice";
import LinkReducer from "@/features/Links/linkSlice";
import AuthReducer from "@/features/Auth/authSlice";

export const store = configureStore({
  reducer: {
    tab: TabReducer,
    link: LinkReducer,
    auth: AuthReducer,
  },
});
