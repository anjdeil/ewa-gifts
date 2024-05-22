import { z } from "zod";

export const ProductColorSchema = z.object({
    slug: z.string(),
    options: z.array(z.string())
});

export const ProductCardSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.string(),
    slug: z.string(),
    price_html: z.string(),
    image: z.string(),
    attributes: z.array(ProductColorSchema),
    default_attr: z.string(),
    isSized: z.boolean(),
    stock: z.number().nullable()
});

const ProductCardPropsSchema = z.object({
    product: ProductCardSchema,
});

export type ProductType = z.infer<typeof ProductCardSchema>;
export type ProductCardProps = z.infer<typeof ProductCardPropsSchema>;