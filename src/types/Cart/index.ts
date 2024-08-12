import { z } from "zod";
import { lineOrderItemsSchema } from "../store";
import { ProductsCirculationsSchema } from "../Services/customApi/Product/ProductsCirculationsType";

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
    total: z.string(),
    supplier: z.string()
});

export const CartTablePropsSchema = z.object({
    lineItems: z.array(lineOrderItemsSchema),
    productsSpecs: z.array(ProductsCirculationsSchema),
    isLoading: z.boolean(),
    cartItems: z.array(CartItemSchema),
});

export const CartTableRowProps = z.object({
    lineItem: lineOrderItemsSchema,
    productSpecs: ProductsCirculationsSchema.nullable(),
    isLoading: z.boolean()
});

export type CartTableRowType = z.infer<typeof CartTableRowProps>;
export type CartTableProps = z.infer<typeof CartTablePropsSchema>
export type CartItem = z.infer<typeof CartItemSchema>;
export type CartProduct = z.infer<typeof CartProductsSchema>;