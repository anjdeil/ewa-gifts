import { z } from "zod";

export const ProductColorSchema = z.object({
    slug: z.string(),
    options: z.array(z.string())
})

export const ProductCardSchema = z.object({
    name: z.string(),
    price: z.string(),
    slug: z.string(),
    price_html: z.string(),
    image: z.string(),
    attributes: z.array(ProductColorSchema),
    default_attr: z.string(),
    isSized: z.boolean()
})

export type ProductType = z.infer<typeof ProductCardSchema>;