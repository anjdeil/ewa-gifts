import { z } from "zod";
import { cartItem } from "../store";

const CartProductsSchema = z.object({
    id: z.number(),
    image: z.object({
        id: z.string(),
        src: z.string(),
    }),
    meta_data: z.any(),
    name: z.string(),
    parent_name: z.string().nullable(),
    price: z.number(),
    product_id: z.number(),
    quantity: z.number(),
    sku: z.string(),
    subtotal: z.string(),
    subtotal_tax: z.string(),
    tax_class: z.string(),
    taxes: z.any(),
    total: z.string(),
    total_tax: z.string(),
    variation_id: z.number()
})

export const CartTablePropsSchema = z.object({
    products: z.array(cartItem),
    isLoading: z.boolean()
});

export const createOrderProductsSchema = z.object({
    product_id: z.number(),
    variation_id: z.number().optional(),
    quantity: z.number()
});

export type CartTableProps = z.infer<typeof CartTablePropsSchema>
export type createOrderProducts = z.infer<typeof createOrderProductsSchema>;
export type CartProduct = z.infer<typeof CartProductsSchema>;