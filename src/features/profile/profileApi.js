import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../lib/supabaseClient";

const supabaseBaseQuery =
  () =>
  async ({ queryFn }) => {
    try {
      const result = await queryFn();
      if (result.error) throw result.error;
      return { data: result.data };
    } catch (error) {
      return { error };
    }
  };

export const profileApi = createApi({
  baseQuery: supabaseBaseQuery(),
  tagTypes: ["profile"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      queryFn: async (userId) => {
        return await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();
      },
    }),
    signIn: builder.mutation({
      queryFn: async ({ email, password }) => {
        return await supabase.auth.signInWithPassword({ email, password });
      },
    }),
    signUp: builder.mutation({
      queryFn: async ({ email, password }) => {
        return await supabase.auth.signUp({ email, password });
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
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
} = profileApi;
