import { z } from "zod";

const OpenGraphSchema = z.object({
    description: z.string().optional(),
    image: z.string().optional(),
    image_id: z.number().optional(),
    image_meta: z.object({
        alt: z.string(),
        filesize: z.number(),
        height: z.number().optional(),
        id: z.number().optional(),
        path: z.string().optional(),
        pixels: z.number(),
        size: z.string().optional(),
        type: z.string().optional(),
        url: z.string().optional(),
        width: z.number().optional(),
    }),
    image_source: z.string().optional(),
    title: z.string().optional(),
});

const TwitterSchema = z.object({
    description: z.string().optional(),
    image: z.string().optional(),
    image_id: z.number().optional(),
    image_source: z.string().optional(),
    title: z.string().optional(),
});

export const SeoDataSchema = z.object({
    bot: z.object({
        is_no_archive: z.boolean(),
        is_no_follow: z.boolean(),
        is_no_index: z.boolean(),
    }),
    breadcrumb_title: z.string().optional(),
    description: z.string().optional(),
    open_graph: OpenGraphSchema,
    reading_time_minutes: z.number().optional(),
    title: z.string().optional(),
    twitter: TwitterSchema,
});

export type SeoDataType = z.infer<typeof SeoDataSchema>;