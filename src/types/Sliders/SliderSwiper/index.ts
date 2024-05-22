import { z } from "zod";
import { Images } from "../..";

export const SlideSchema = z.object({
    images: Images,
})

export const SliderPropsSchema = z.object({
    data: SlideSchema,
})

export type SlidersType = z.infer<typeof SlideSchema>[];
export type SliderProps = z.infer<typeof SliderPropsSchema>;