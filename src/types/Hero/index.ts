import { z } from "zod";
import { Images } from "..";

export const HeroPropsSchema = z.object({
    title: z.string(),
    richText: z.string(),
    isReversed: z.boolean(),
    images: Images,
});

export type HeroPropsType = z.infer<typeof HeroPropsSchema>;