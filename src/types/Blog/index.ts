import { z } from "zod";

export const BlogCategorySchema = z.object({
  id: z.number(),
  parent_id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  count: z.number(),
});

export const BlogItemSchema = z.object({
  id: z.number(),
  slug: z.string(),
  status: z.string(),
  type: z.string(),
  parent: z.number(),
  title: z.string(),
  content: z.string(),
  excerpt: z.string(),
  created: z.string(),
  modified: z.string(),
  thumbnail: z.string().url(),
  menu_order: z.number(),
  categories: z.array(BlogCategorySchema),
  prev_post: z.string(),
  next_post: z.string(),
});

export const BlogStatisticSchema = z.object({
  posts_count: z.number(),
});

export const BlogDataSchema = z.object({
  data: z.object({
    items: z.array(BlogItemSchema),
    statistic: BlogStatisticSchema,
  }),
});

const BlogListPropsSchema = z.object({
  data: z.array(BlogItemSchema).optional(),
});

const BlogItemPropsSchema = z.object({
  post: BlogItemSchema,
});

export const BlogBuildSchema = z.object({
  blog: z.string(),
  _type: z.string(),
});

export const BlogFetchDataSchema = z.array(z.any());

export type BlogCategoryType = z.infer<typeof BlogCategorySchema>;
export type BlogItemType = z.infer<typeof BlogItemSchema>;
export const BlogListSchema = z.array(BlogItemSchema);
export type BlogListType = z.infer<typeof BlogListSchema>;
export type BlogListProps = z.infer<typeof BlogListPropsSchema>;
export type BlogItemProps = z.infer<typeof BlogItemPropsSchema>;
export type BlogFetchData = z.infer<typeof BlogFetchDataSchema>;
export type BlogDataType = z.infer<typeof BlogDataSchema>;
