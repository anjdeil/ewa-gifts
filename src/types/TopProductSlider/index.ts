import { z } from "zod";
import { Images } from "..";

export const TopProductSliderSchema = z.object({
    images: Images,
    title: z.string(),
    desc: z.string()
});

export type TopProductSliderType = z.infer<typeof TopProductSliderSchema>;