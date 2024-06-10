import { IPost } from "@/modules/IPost";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllPosts: build.query<IPost[], number>({
            query: (limit: number = 5) => ({
                url: '/posts',
                params: {
                    _limit: limit
                }
            }),
            transformResponse: (response: IPost[]) =>
            {
                return response.map(post => ({
                    ...post,
                    title: post.title.toUpperCase()
                }));
            },
            providesTags: (result) => result ? ['Post'] : [],
        }),
        createPost: build.mutation<IPost>({
            query: (post) => ({
                url: '/posts',
                method: "POST",
                body: post
            }),
            invalidatesTags: ['Post']
        })
    })
})
