import { ApiBase } from "../../services/api.js";

const cartApi = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "cart/get-cart",
      providesTags: ["Cart"],
    }),
    addProductToCart: builder.mutation({
      query: (data) => ({
        url: "cart/add-to-cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeProductFromCart: builder.mutation({
      query: (id) => ({
        url: `cart/remove-from-cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddProductToCartMutation,
  useRemoveProductFromCartMutation,
} = cartApi;
