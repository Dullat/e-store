// ############### Switched to rtk-query cache, profile is being used/stored in rtk-query cache so no need to use a state for profile data ####################
// ############### But keeping the file for later understanding ###############################################################################################

import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../lib/supabaseClient";
import { ApiBase } from "../../services/api.js";
import { setProfile, unsetProfile, setProfileError } from "./profileSlice.js";

// ############## injecting endPoints ##############

export const userApi = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(
            setProfile({
              profile: data.data.user,
            }),
          );
        } catch (err) {
          console.log("Error setting profile");
        }
      },
      invalidatesTags: ["User"],
    }),
    getProfile: builder.query({
      query: () => "auth/get-user",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(
            setProfile({
              profile: data.data.user,
            }),
          );
        } catch (err) {
          console.log("Error setting profile");
        }
      },
      providesTags: ["User"],
    }),
    updateAvatar: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("image", file);
        return {
          url: "/user/update-avatar",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),
    updateUserName: builder.mutation({
      query: (user_name) => ({
        url: "/user/update-username",
        method: "PATCH",
        body: { user_name },
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST", // or DELETE, depending on your API
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(setProfile({ profile: null }));
        } catch (err) {
          console.error("Failed to log out", err);
        }
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useUpdateAvatarMutation,
  useUpdateUserNameMutation,
  useLogoutMutation,
  useSigninMutation,
} = userApi;
