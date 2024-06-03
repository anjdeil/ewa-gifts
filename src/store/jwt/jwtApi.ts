import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jwtApi = createApi({
    reducerPath: 'jwtApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://new.ewagifts.pl/wp-json/jwt-auth/v1/token' }),
    endpoints: (build) => ({
        fetchUserToken: build.mutation({
            query: (credentials) => ({
                url: '',
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        fetchCheckLoggedIn: build.mutation({
            query: (accessToken) => ({
                url: '/validate',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }),
        }),
    }),
})

export const { useFetchUserTokenMutation, useFetchCheckLoggedInMutation } = jwtApi;