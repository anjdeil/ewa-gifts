import { z } from "zod";
import { ProductsMinimizedSchema } from "./ProductsMinimizedType";

export const ResponseProductsMinimizedSchema = z.object({
    status: z.string(),
    data: z.object({
        items: z.array(ProductsMinimizedSchema)
    }).optional(),
    error: z.object({
        message: z.string()
    }).optional()
});

export type ResponseProductsMinimizedType = z.infer<typeof ResponseProductsMinimizedSchema>;