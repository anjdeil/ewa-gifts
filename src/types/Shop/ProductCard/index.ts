import { z } from "zod";

export const ProductCardSchema = z.object({
    attributes: z.array(z.string()),
    categories: z.any(),
    id: z.number(),
    date: z.string(),
    description: z.string(),
    images: z.array(z.string()),
    name: z.string(),
    sale_price: z.string(),
    price: z.string(),
    price_html: z.string(),
    sku: z.string(),
    slug: z.string(),
    stock: z.number().nullable(),
    image: z.string(),
    default_attr: z.string(),
    isSized: z.boolean(),
});

const ProductCardPropsSchema = z.object({
    product: ProductCardSchema,
});

export type ProductType = z.infer<typeof ProductCardSchema>;
export type ProductCardProps = z.infer<typeof ProductCardPropsSchema>;