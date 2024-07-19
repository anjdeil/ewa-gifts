import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wooCommerceApi = createApi({
    reducerPath: 'wooCommerceApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/woo' }),
    endpoints: (build) => ({
        fetchProductList: build.query({
            query: (params) => ({
                url: `/products`,
                params
            })
        }),
        fetchProductVariations: build.query({
            query: (id) => ({
                url: `/products/${id}/variations`
            })
        }),
        fetchOrder: build.query({
            query: (id) => ({
                url: `/orders/${id}`
            })
        }),
        fetchUserRegistration: build.mutation({
            query: (credentials) => ({
                url: `/customers`,
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }),
        fetchCreateOrder: build.mutation({
            query: (credentials) => ({
                url: `/orders`,
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }),
        fetchUpdateOrder: build.mutation({
            query: ({ credentials, id }) => ({
                url: `/orders/${id}`,
                method: 'PUT',
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }),
        fetchAttributeTerms: build.query({
            query: (id) => ({
                url: `/products/attributes/${id}/terms`,
                params: {
                    per_page: 100
                }
            })
        })
    })
})


export const {
    useFetchAttributeTermsQuery,
    useFetchProductListQuery,
    useLazyFetchProductVariationsQuery,
    useFetchProductVariationsQuery,
    useFetchOrderQuery,
    useFetchUserRegistrationMutation,
    useFetchCreateOrderMutation,
    useFetchUpdateOrderMutation,
} = wooCommerceApi;