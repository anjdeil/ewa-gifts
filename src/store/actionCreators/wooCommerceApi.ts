import { fetchProducts } from "@/store/reducers/ActionCreators";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wooCommerceApi = createApi({
    reducerPath: 'wooCommerceApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'api/woo' }),
    endpoints: (build) => ({
        fetchGlobalSearchResults: build.query({
            query: (params) => ({
                url: `/search-global`,
                params
            })
        }),
        fetchProductList: build.query({
            query: (params) => ({
                url: `/products`,
                params
            })
        })
    })
})

export const {
    useFetchGlobalSearchResultsQuery,
    useFetchProductListQuery
} = wooCommerceApi;