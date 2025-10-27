import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: { profile: null, error: null },
  reducers: {
    setProfile: (state, action) => {
      const { profile } = action.payload;
      state.profile = profile;
      state.error = null;
    },
    unsetProfile: (state, action) => {
      state.profile = null;
      state.error = null;
    },
    setProfileError: (state, action) => {
      const { error } = action.payload;
      state.error = error;
    },
  },
});

export const { setProfile, unsetProfile, setProfileError } =
  profileSlice.actions;

export const selectProfile = (state) => state.profile?.profile || null;
export const selectProfileError = (state) => state.profile?.error || null;

export default profileSlice.reducer;
