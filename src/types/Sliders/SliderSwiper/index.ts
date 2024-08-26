import { slideSchema } from "@/components/PageBuilder";
import { z } from "zod";

export const SliderPropsSchema = z.object({
    slides: z.array(slideSchema),
    height: z.union([z.string(), z.number()]).optional()
});

export const SliderBuild = z.object({
    slider: z.array(slideSchema),
    _type: z.string()
});

export type SlidersType = z.infer<typeof slideSchema>[];
export type SliderType = z.infer<typeof slideSchema>;
export type SliderProps = z.infer<typeof SliderPropsSchema>;