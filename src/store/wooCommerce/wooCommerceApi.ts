import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const fetchAllCategories = async (page = 1, categories = []) => {
    try {
        const response = await axios.get("/api/woo/products/categories", {
            params: {
                per_page: 100,
                page
            }
        });
        const allCategories = categories.concat(response.data);

        if (response.data.length === 100) {
            return fetchAllCategories(page + 1, allCategories);
        }
        return allCategories;
    } catch (error) {
        throw error;
    }
}

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
        fetchAllCategoriesList: build.query({
            queryFn: async () => {
                try {
                    const data = await fetchAllCategories();
                    return { data };
                } catch (error) {
                    return { error: "Failed to fetch categories!" }
                }
            }
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
    useFetchAllCategoriesListQuery,
    useLazyFetchProductVariationsQuery,
    useFetchProductVariationsQuery,
    useFetchUserRegistrationMutation,
} = wooCommerceApi;