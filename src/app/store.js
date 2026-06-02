import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "../features/profile/profileSlice";
import { userApi } from "../features/profile/profileApi.js";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    profile: profileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
