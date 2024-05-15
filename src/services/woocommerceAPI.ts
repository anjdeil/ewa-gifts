import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wooCommerceApi = createApi({
    reducerPath: 'wooCommerceApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'api/woo' }),
    endpoints: (build) => ({
        fetchGlobalSearchResults: build.query({
            query: (search) => ({
                url: `/search`,
                params: { search }
            }),
            transformResponse: (response) => response.map(
                (responseRow) => ({
                    ...responseRow,
                    postType: responseRow.type ? 'product' : 'category'
                })
            )
        }),
        fetchProductList: build.query({
            query: (params) => ({
                url: `/products`,
                params
            })
        }),
        fetchProductVariations: build.query({
            query: (id) => ({
                url: `/products-${id}-variations`,
            })
        }),
        fetchCategoriesList: build.query({
            query: (params) => ({
                url: `/categories`,
                params
            })
        })
    })
})


export const {
    useFetchGlobalSearchResultsQuery,
    useFetchProductListQuery,
    useFetchCategoriesListQuery,
    useLazyFetchProductVariationsQuery,
    useFetchProductVariationsQuery
} = wooCommerceApi;