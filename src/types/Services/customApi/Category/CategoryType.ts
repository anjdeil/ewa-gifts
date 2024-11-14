import { SeoDataSchema } from "@/types/seo";
import { z } from "zod";

export const CategorySchema = z.object({
    count: z.number(),
    description: z.string(),
    id: z.number(),
    name: z.string(),
    parent_id: z.number(),
    seo_data: SeoDataSchema.optional(),
    slug: z.string(),
    video_url: z.string().nullable().optional()
});

export const responseSingleCategoryCustomApiSchema = z.object({
    data: z.object({
        item: CategorySchema
    }),
    status: z.string()
})

export type CategoryType = z.infer<typeof CategorySchema>;
export type ResponseSingleCategoryCustomType = z.infer<typeof responseSingleCategoryCustomApiSchema>;