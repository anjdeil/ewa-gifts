import { z } from "zod";

const CartItemVariationSchema = z.object({
    attributes: z.array(z.any()).optional(),
    id: z.number(),
    quantity: z.number(),
    type: z.string()
});

const CartItemSchema = z.object({
    id: z.number(),
    options: z.array(CartItemVariationSchema),
    quantity: z.number(),
    type: z.string()
});

const lineOrderItemsSchema = z.object({
    id: z.number(),
    name: z.string(),
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
    sku: z.string(),
    price: z.number()
});

export type CartItem = z.infer<typeof CartItemSchema>
export type lineOrderItems = z.infer<typeof lineOrderItemsSchema>;
