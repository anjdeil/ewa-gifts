import { ProductSchema } from "@/types/Shop";
import { z } from "zod";

export const responseProductInfoSchema = z.object({
    data: z.object({
        item: ProductSchema
    }),
    status: z.string()
});

export type responseProductInfoType = z.infer<typeof responseProductInfoSchema>;