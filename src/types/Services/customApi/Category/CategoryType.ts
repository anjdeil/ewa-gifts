import { z } from "zod";

export const CategoryTypeSchema = z.object({
    id: z.number(),
    parent_id: z.number(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    count: z.number()
});

export type CategoryType = z.infer<typeof CategoryTypeSchema>;