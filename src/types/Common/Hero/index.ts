import { z } from "zod";

export const HeroSchema = z.object({
    image: z.string(),
    is_reverse: z.boolean(),
    link_text: z.string(),
    link_url: z.string(),
    text: z.string(),
    title: z.string(),
    _type: z.string()
});

const HeroPropsSchema = z.object({
    section: HeroSchema,
});

export type HeroPropsType = z.infer<typeof HeroPropsSchema>;
export type HeroProps = z.infer<typeof HeroPropsSchema>
export type HeroSchema = z.infer<typeof HeroSchema>;
