/// #################### This is complex one, only for understanding things #################

import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../lib/supabaseClient";
import { setProfile, setProfileError } from "./profileSlice";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: async () => ({ data: null }),
  tagTypes: ["profile"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      queryFn: async (userId) => {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) return { error };
        return { data };
      },
      providesTags: (result, _error, userId) => ["profile", userId],
    }),
    updateAvatar: builder.mutation({
      queryFn: async ({ userId, file, filePath }) => {
        const { error: fileUploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, file, { upsert: true });
        if (fileUploadError) return { error: fileUploadError };

        const { data: urlData, error: getPublicUrlError } =
          await supabase.storage.from("avatars").getPublicUrl(filePath);
        if (getPublicUrlError) return { error: getPublicUrlError };

        const avatarUrl = urlData?.publicUrl;

        const { error: urlUpdateError } = await supabase
          .from("profiles")
          .update({ avatar: avatarUrl })
          .eq("id", userId);

        if (urlUpdateError) return { error: urlUpdateError };

        return { data: { avatar: avatarUrl } };
      },
      async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          const profile = await dispatch(
            profileApi.endpoints.getProfile.initiate(userId, {
              forceRefetch: true,
            }),
          ).unwrap();

          dispatch(setProfile({ profile }));
        } catch (error) {
          console.error(error);
          dispatch(setProfileError({ error: error }));
        }
      },
    }),

    updateUserName: builder.mutation({
      queryFn: async ({ userName }, { getState }) => {
        const state = getState();
        const profile = state.profile.profile;
        const userId = profile?.id;

        if (!userId) return { error: new Error("User ID not found") };

        const { data, error } = await supabase
          .from("profiles")
          .update({ user_name: userName })
          .eq("id", userId)
          .select("*");

        if (error) return { error };

        return { data: data?.[0] };
      },

      async onQueryStarted(
        { userName },
        { dispatch, getState, queryFulfilled },
      ) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setProfile({ profile: data }));
        } catch (err) {
          console.error("Update username failed:", err);
        }
      },
    }),
    signIn: builder.mutation({
      queryFn: async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) return { error };

        return { data };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled; // wait for sign-in
          const userId = data?.user?.id;
          if (!userId) return;

          const { data: profile, error } = await dispatch(
            profileApi.endpoints.getProfile.initiate(userId, {
              forceRefetch: true,
            }),
          );

          dispatch(setProfile({ profile }));
        } catch {
          // no handling for now
        }
      },
    }),
    signUp: builder.mutation({
      queryFn: async ({ email, password }) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) return { error };
        return { data };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data, error: signUpError } = await queryFulfilled;

          console.log("Account created", data);

          if (signUpError) return { error: signUpError };
          const userId = data?.user?.id;

          if (!userId) {
            return;
          }

          const { data: profile, error: profileInsertError } = await supabase
            .from("profiles")
            .insert([{ id: userId, user_name: "randomGuy" }])
            .select();

          if (profileInsertError) {
            return { error: profileInsertError };
          }

          console.log(profile);

          dispatch(setProfile({ profile }));

          const { data: cart } = await supabase
            .from("carts")
            .insert([{ user_id: userId }]);

          return { data: profile };
        } catch (error) {
          console.log(error);
        }
      },
    }),
    signOut: builder.mutation({
      queryFn: async () => {
        return await supabase.auth.signOut();
      },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useUpdateAvatarMutation,
  useUpdateUserNameMutation,
} = profileApi;
