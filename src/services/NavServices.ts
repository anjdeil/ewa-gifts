
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const username = "admin";
// const password = "d36a QZT9 p6o8 1u6n 5fon J2Uu";
// const Authorization = Buffer.from(`${username}:${password}`).toString("base64");

// export const menuAPI = createApi({
//     reducerPath: 'menu',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'https://new.ewagifts.pl/wp-json/wp/v2/',
//         headers: {
//             'Authorization': `Basic ${Authorization}`,
//         },
//     }),
//     tagTypes: ['menu'],
//     endpoints: (build) => ({
//         fetchMenuItems: build.query({
//             query: (id: string) => ({
//                 url: `menu-items?menus=${id}`,
//             }),
//             transformResponse: (response) =>
//             {
//                 console.log('Запрос завершен:', response);
//                 return response;
//             },
//         }),
//     }),
// });


import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const baseUrl = 'https://new.ewagifts.pl/wp-json/wp/v2/';
const username = 'admin';
const password = 'd36a QZT9 p6o8 1u6n 5fon J2Uu';
const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');

export const fetchMenuItems = async (id) => {
    const response = await axios.get(`${baseUrl}menu-items?menus=${id}`, {
        headers: {
            Authorization: `Basic ${basicAuth}`,
        },
    });
    return response.data;
};

const useMenuItems = (id) => {
    return useQuery({
        queryKey: ['menuItems', id],
        queryFn: () => fetchMenuItems(id),
    });
};

export default useMenuItems;
