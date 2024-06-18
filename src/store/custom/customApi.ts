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
        })
    })
});

export const {
    useFetchProductListQuery,
    useFetchProductQuery,
    useFetchCategoryListQuery,
} = customApi;