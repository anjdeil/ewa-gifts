import { z } from "zod";

export const cartProductSchema = z.object({
    id: z.string(),
    image: z.object({
        alt: z.string(),
        date_created: z.string(),
        date_created_gmt: z.string(),
        date_modified: z.string(),
        date_modified_gmt: z.string(),
        id: z.string(),
        name: z.string(),
        src: z.string(),
    }),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    stockQuantity: z.number().nullable(),
    type: z.string()
});

export const CartTablePropsSchema = z.object({
    products: z.array(cartProductSchema),
    isLoading: z.boolean()
});

export const createOrderProductsSchema = z.object({
    product_id: z.number(),
    variation_id: z.number().optional(),
    quantity: z.number()
});

export type CartTableProps = z.infer<typeof CartTablePropsSchema>
export type cartProduct = z.infer<typeof cartProductSchema>;
export type createOrderProducts = z.infer<typeof createOrderProductsSchema>;