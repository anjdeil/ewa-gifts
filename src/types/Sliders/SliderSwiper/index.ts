import { z } from "zod";

export const SlideSchema = z.object({
    image_desc: z.string(),
    image_mob: z.string(),
    text: z.string(),
    url: z.string(),
    _type: z.string()
});

export const SliderPropsSchema = z.object({
    slides: z.array(SlideSchema),
    height: z.union([z.string(), z.number()]).optional()
});

export const SliderBuild = z.object({
    slider: z.array(SlideSchema),
    _type: z.string()
});

export type SlidersType = z.infer<typeof SlideSchema>[];
export type SliderProps = z.infer<typeof SliderPropsSchema>;
export type SliderType = z.infer<typeof SlideSchema>;