import { z } from "zod";
import { OrderTypeSchema } from "../Services/woocommerce/OrderType";

const userDetailsSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    company: z.string(),
    address_1: z.string(),
    address_2: z.string(),
    city: z.string(),
    postcode: z.string(),
    country: z.string(),
    state: z.string(),
    email: z.string(),
    phone: z.string(),
})

const userDataSchema = z.object({
    id: z.number(),
    date_created: z.string(),
    date_created_gmt: z.string(),
    date_modified: z.string(),
    date_modified_gmt: z.string(),
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    role: z.string().optional(),
    username: z.string(),
    billing: userDetailsSchema,
    shipping: userDetailsSchema,
    is_paying_customer: z.boolean(),
    avatar_url: z.string(),
})

const CheckoutPropsSchema = z.object({
    userData: userDataSchema.nullable(),
    orderData: OrderTypeSchema.nullable(),
})

const registrationUserDetailsSchema = userDetailsSchema.extend({
    address_2: z.string().optional(),
    state: z.string().optional(),
    email: z.string().optional(),
})

const registrationUserDataSchema = userDataSchema.extend({
    id: z.union([z.string(), z.number()]),
    date_created: z.string().optional(),
    date_created_gmt: z.string().optional(),
    date_modified: z.string().optional(),
    date_modified_gmt: z.string().optional(),
    billing: registrationUserDetailsSchema,
    shipping: registrationUserDetailsSchema,
    password: z.string().optional(),
    is_paying_customer: z.boolean().optional(),
    avatar_url: z.string().optional(),
});

export type userFieldsType = z.infer<typeof userDataSchema>;
export type CheckoutProps = z.infer<typeof CheckoutPropsSchema>;
export type registrationUserDataType = z.infer<typeof registrationUserDataSchema>;