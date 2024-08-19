import { z } from "zod";
import { ProductsCirculationsSchema } from "./ProductsCirculationsType";

export const ResponseProductsCirculationsSchema = z.object({
    status: z.string(),
    data: z.object({
        items: z.array(ProductsCirculationsSchema)
    }).optional(),
    error: z.object({
        message: z.string()
    }).optional()
});

export type ResponseProductsCirculationsType = z.infer<typeof ResponseProductsCirculationsSchema>;