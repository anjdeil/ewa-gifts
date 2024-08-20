import { z } from "zod";

export const slideSchema = z.object({
    image_desc: z.string(),
    image_mob: z.string(),
    text: z.string(),
    url: z.string(),
    _type: z.string()
});

export const CategoryBarsBuildSchema = z.object({
    categories: z.string(),
    _type: z.string(),
});

export const HeroSchema = z.object({
    image: z.string(),
    is_reverse: z.boolean(),
    link_text: z.string(),
    link_url: z.string(),
    text: z.string(),
    title: z.string(),
    _type: z.string()
});