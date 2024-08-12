import { PriceCirculationsSchema } from "@/types/Shop";
import { z } from "zod";

export const ProductsCirculationsSchema = z.object({
    product_id: z.number(),
    variation_id: z.number().optional(),
    stock_quantity: z.number(),
    price: z.number(),
    price_circulations: PriceCirculationsSchema
});

export type ProductsCirculationsType = z.infer<typeof ProductsCirculationsSchema>;
