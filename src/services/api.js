import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: baseApiUrl,
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraoptions) => {
  let result = await baseQuery(args, api, extraoptions);

  if (result?.error?.status === 401 && args.url !== "/auth/refresh") {
    let refreshedResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "GET",
      },
      api,
      extraoptions,
    );

    if (refreshedResult?.data) {
      result = await baseQuery(args, api, url);
    }
  }

  return result;
};

export const ApiBase = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: "user",
  endpoints: (builder) => ({}),
});
