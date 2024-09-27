import { z } from "zod";

export const CategorySchema = z.object({
    id: z.number(),
    parent_id: z.number(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    video_url: z.string(),
    count: z.number()
});

export type CategoryType = z.infer<typeof CategorySchema>;