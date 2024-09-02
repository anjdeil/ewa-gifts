import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactForm7Api = createApi({
    reducerPath: 'contactForm7Api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/contact-form' }),
    endpoints: (build) => ({
        sendAnEmail: build.mutation({
            query: ({ formId, formData }) => ({
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `/${formId}/feedback`,
                method: 'POST',
                body: formData,
            }),
        })
    })
})

export const { useSendAnEmailMutation } = contactForm7Api;