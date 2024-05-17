import { wpMenuType } from "@/types/Menus";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";

const menuResponseSchema = z.record(z.any());
type menuResponseType = z.infer<typeof menuResponseSchema>;


export const wpAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'api/data' }),
    endpoints: (build) => ({
        fetchMenuItems: build.query({
            query: (params) => ({
                url: '/menu-items',
                params,
            }),
            transformResponse: (response: menuResponseType): wpMenuType[] =>
            {
                const links = Object.values(response).map(obj => ({
                    title: obj.title.rendered,
                    url: obj.url
                }));
                return links;
            },
        })
    })
})

export const { useFetchMenuItemsQuery } = wpAPI;