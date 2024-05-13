import { z } from "zod";
import { Images } from "..";

export const SlideSchema = z.object({
    images: Images,
})

export type SlidersType = z.infer<typeof SlideSchema>[];