import { z } from "zod";
import { ProductSchema } from "@/types/Shop";

export const ResponseProductListSchema = z.object({
    status: z.string(),
    data: z.object({
        statistic: z.object({
            products_count: z.number(),
            min_price: z.number(),
            max_price: z.number()
        }),
        items: z.array(ProductSchema)
    }).optional(),
    error: z.object({
        message: z.string()
    }).optional()
});

export type ResponseProductListType = z.infer<typeof ResponseProductListSchema>;