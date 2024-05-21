import { z } from "zod";
import { Images } from "../..";

export const HeroSchema = z.object({
    title: z.string(),
    richText: z.string(),
    isReversed: z.boolean(),
    images: Images,
});

const HeroPropsSchema = z.object({
    data: HeroSchema,
});

export type HeroPropsType = z.infer<typeof HeroPropsSchema>;
export type HeroProps = z.infer<typeof HeroPropsSchema>