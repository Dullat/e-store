import { configureStore } from "@reduxjs/toolkit";
import { profileApi } from "../features/profile/profileApi";
import profileSlice from "../features/profile/profileSlice";

const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
    profile: profileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware),
});

export default store;
