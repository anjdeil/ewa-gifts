import { z } from "zod";

export const BlogItemSchema = z.object({
    author: z.string(),
    id: z.number(),
    categories: z.any(),
    content: z.string(),
    excerpt: z.string(),
    date: z.string(),
    image_src: z.string(),
    link: z.string(),
    slug: z.string(),
    tags: z.any(),
    title: z.string(),
});

const BlogListPropsSchema = z.object({
    data: z.array(BlogItemSchema).optional(),
});

const BlogItemPropsSchema = z.object({
    post: BlogItemSchema,
});

export const BlogBuildSchema = z.object({
    blog: z.string(),
    _type: z.string()
});

export const BlogFetchDataSchema = z.array(z.any());

export type BlogItemType = z.infer<typeof BlogItemSchema>
export const BlogListSchema = z.array(BlogItemSchema);
export type BlogListType = z.infer<typeof BlogListSchema>;
export type BlogListProps = z.infer<typeof BlogListPropsSchema>;
export type BlogItemProps = z.infer<typeof BlogItemPropsSchema>;
export type BlogFetchData = z.infer<typeof BlogFetchDataSchema>;