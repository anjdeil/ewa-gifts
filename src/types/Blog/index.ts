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

const BlogListPropsSchema = z.object({
    data: z.array(BlogItemSchema),
});

const BlogItemPropsSchema = z.object({
    post: BlogItemSchema,
});

export type BlogItemType = z.infer<typeof BlogItemSchema>
export const BlogListSchema = z.array(BlogItemSchema);
export type BlogListType = z.infer<typeof BlogListSchema>;
export type BlogListProps = z.infer<typeof BlogListPropsSchema>;
export type BlogItemProps = z.infer<typeof BlogItemPropsSchema>;