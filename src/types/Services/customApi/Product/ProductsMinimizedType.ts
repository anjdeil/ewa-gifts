import { PriceCirculationsSchema } from "@/types/Shop";
import { z } from "zod";

export const ProductsMinimizedSchema = z.object({
    id: z.number(),
    parent_id: z.number(),
    stock_quantity: z.number(),
    price: z.number(),
    slug: z.string(),
    sku: z.string(),
    name: z.string(),
    price_circulations: PriceCirculationsSchema,
    image: z.object({
        id: z.number(),
        name: z.string(),
        src: z.string()
    }),
    attributes: z.array(z.object({
        id: z.number(),
        name: z.string(),
        option: z.string()
    }))
});

export type ProductsMinimizedType = z.infer<typeof ProductsMinimizedSchema>;