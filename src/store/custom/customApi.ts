import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customApi = createApi({
    reducerPath: "customApi",
    baseQuery: fetchBaseQuery({ baseUrl: '/api/custom' }),
    endpoints: (build) => ({
        fetchProductList: build.query({
            query: (params) => ({
                url: `/products`,
                params,
            })
        }),
        fetchProduct: build.query({
            query: ({ slug, ...params }) => ({
                url: `/products/${slug}`,
                params,
            })
        }),
        fetchCategoryList: build.query({
            query: (params) => ({
                url: `/categories`,
                params
            })
        }),
        fetchMenuItemsList: build.query({
            query: (params) => ({
                url: `/menu-items`,
                params
            })
        }),
        fetchAttributeTerms: build.query({
            query: (slug) => ({
                url: `/attributes/${slug}/terms`
            })
        }),
        fetchProductsCirculations: build.mutation({
            query: (body) => ({
                url: `/products/circulations`,
                method: 'POST',
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }),
        fetchProductsMinimized: build.mutation({
            query: (body) => ({
                url: `/products/minimized`,
                method: 'POST',
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }),
    })
});

export const {
    useFetchProductListQuery,
    useFetchProductQuery,
    useFetchCategoryListQuery,
    useFetchAttributeTermsQuery,
    useFetchProductsCirculationsMutation,
    useFetchProductsMinimizedMutation,
    useFetchMenuItemsListQuery
} = customApi;