import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";

// const menuResponseSchema = z.record(z.any());
// type menuResponseType = z.infer<typeof menuResponseSchema>;


export const contactForm7Api = createApi({
    reducerPath: 'contactForm7Api',
    baseQuery: fetchBaseQuery({ baseUrl: 'api/contact-form' }),
    endpoints: (build) => ({
        sendAnEmail: build.mutation({
            query: ({ id, formData }) => ({
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `/${id}/feedback`,
                method: 'POST',
                body: formData,
            }),
        })
    })
})

export const { useSendAnEmailMutation } = contactForm7Api;