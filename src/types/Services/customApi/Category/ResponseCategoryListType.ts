import { z } from "zod";
import { CategoryTypeSchema } from "./CategoryType";

export const ResponseCategoryListTypeSchema = z.object({
    status: z.string(),
    data: z.object({
        items: z.array(CategoryTypeSchema)
    }).optional(),
    error: z.object({
        message: z.string()
    }).optional()
});

export type ResponseCategoryListType = z.infer<typeof ResponseCategoryListTypeSchema>;