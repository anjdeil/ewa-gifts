import { z } from "zod";

export const BlogItemSchema = z.object({
    id: z.number(),
    date: z.string(),
    slug: z.string(),
    status: z.string(),
    title: z.string(),
    excerpt: z.string(),
    content: z.string(),
    image: z.string()
});

export type BlogItemType = z.infer<typeof BlogItemSchema>

export const BlogListSchema = z.array(BlogItemSchema);

export type BlogListType = z.infer<typeof BlogListSchema>;