import { z } from "zod";
// import { lineOrderItemsSchema } from "../store";

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

export const CartItemSchema = z.object({
    product_id: z.number(),
    variation_id: z.number().optional(),
    quantity: z.number(),
    total: z.string().optional(),
    supplier: z.string().optional()
});

export const CartTablePropsSchema = z.object({
    // products: z.array(lineOrderItemsSchema),
    products: z.array(z.object({
        id: z.number(),
        name: z.string(),
        parent_name: z.string().nullable(),
        product_id: z.number(),
        variation_id: z.number(),
        quantity: z.number(),
        tax_class: z.string(),
        subtotal: z.string(),
        subtotal_tax: z.string(),
        total: z.string(),
        total_tax: z.string(),
        taxes: z.array(z.any()),
        meta_data: z.array(z.any()),
        image: z.object({
            id: z.number(),
            src: z.string()
        }),
        sku: z.string(),
        price: z.number()
    })),
    total: z.string(),
    isLoading: z.boolean()
});

export type CartTableProps = z.infer<typeof CartTablePropsSchema>
export type CartItem = z.infer<typeof CartItemSchema>;
export type CartProduct = z.infer<typeof CartProductsSchema>;