import { z } from "zod";
import { Images } from "../..";

export const TopProductSliderSchema = z.object({
    images: Images,
    title: z.string(),
    desc: z.string()
});

const TopProductSliderPropsSchema = z.object({
    data: z.array(TopProductSliderSchema),
});

export type TopProductSliderType = z.infer<typeof TopProductSliderSchema>;
export type TopProductSliderProps = z.infer<typeof TopProductSliderPropsSchema>;