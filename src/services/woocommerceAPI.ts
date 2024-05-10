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
        fetchCategoriesList: build.query({
            query: (params) => ({
                url: `/categories`,
                params
            }),
            transformResponse: (response) => {
                const categories = [];

                response.forEach(parentRow => {
                    if (parentRow.parent) return;

                    const subcategories = [];
                    response.forEach(childRow => {
                        if (childRow.parent !== parentRow.id) return;

                        subcategories.push({
                            id: childRow.id,
                            categoryName: childRow.name,
                            slug: childRow.slug
                        });
                    });

                    categories.push({
                        id: parentRow.id,
                        categoryName: parentRow.name,
                        slug: parentRow.slug,
                        subcategories
                    });
                });

                return categories;
            }

        })
    })
})


export const {
    useFetchGlobalSearchResultsQuery,
    useFetchProductListQuery,
    useFetchCategoriesListQuery
} = wooCommerceApi;