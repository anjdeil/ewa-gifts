import { z } from "zod";
import { CategorySchema } from "./CategoryType";

export const ResponseCategoryListSchema = z.object({
    status: z.string(),
    data: z.object({
        items: z.array(CategorySchema)
    }).optional(),
    error: z.object({
        message: z.string()
    }).optional()
});

export type ResponseCategoryListType = z.infer<typeof ResponseCategoryListSchema>;