import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const wpAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'api/data' }),
    endpoints: (build) => ({
        fetchMenuItems: build.query({
            query: (params) => ({
                url: '/menu-items',
                params,
            }),

        })
    })
})

export const { useFetchMenuItemsQuery } = wpAPI;

// transformResponse: (response) =>
// {
//     return response.map(post => ({
//         ...post,
//         title: post.title.toUpperCase()
//     }));
// },
