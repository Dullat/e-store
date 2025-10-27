// ############### Switched to rtk-query cache, profile is being used/stored in rtk-query cache so no need to use a state for profile data ####################
// ############### But keeping the file for later understanding ###############################################################################################

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
        console.log("============== i got changed ==================\n", data);
        return { data };
      },
      providesTags: (result, _error, userId) => [
        { type: "profile", id: userId },
      ],
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
      invalidatesTags: (result, error, { userId }) => [
        { type: "profile", id: userId },
      ],
    }),

    updateUserName: builder.mutation({
      queryFn: async ({ userName }) => {
        const { data: authData, error: authError } =
          await supabase.auth.getUser();

        if (authError || authData?.user == null)
          return { error: authError || new Error("User not found") };

        const userId = authData?.user?.id;

        const { data, error } = await supabase
          .from("profiles")
          .update({ user_name: userName })
          .eq("id", userId)
          .select("*");

        if (error) return { error };

        return { data: data[0] };
      },
      invalidatesTags: (result, error, args) => {
        return result.id ? [{ type: "profile", id: result.id }] : [];
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
          const { data } = await queryFulfilled;
          const userId = data?.user?.id;

          await dispatch(
            profileApi.endpoints.getProfile.initiate(userId, {
              forceRefetch: true,
            }),
          );
        } catch (error) {}
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
          const { data } = await queryFulfilled;
          const userId = data?.user?.id;
          const email = data?.user?.email;

          if (!userId) return;

          const { error: profileInsertError } = await supabase
            .from("profiles")
            .insert([{ id: userId, user_name: "randomGuy", email: email }])
            .select();

          if (profileInsertError) {
            console.error(profileInsertError);
            return;
          }

          await supabase.from("carts").insert([{ user_id: userId }]);

          await dispatch(
            profileApi.endpoints.getProfile.initiate(userId, {
              forceRefetch: true,
            }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    signOut: builder.mutation({
      queryFn: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) return { error };
        return { data: null };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(profileApi.util.resetApiState());
        } catch (error) {
          console.error(error);
        }
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
