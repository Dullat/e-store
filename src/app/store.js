import { configureStore } from "@reduxjs/toolkit";
import { profileApi } from "../features/profile/profileApi";
import profileSlice from "../features/profile/profileSlice";
import { userApi } from "../features/profile/profileApi.js";

const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    profile: profileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(profileApi.middleware)
      .concat(userApi.middleware),
});

export default store;
