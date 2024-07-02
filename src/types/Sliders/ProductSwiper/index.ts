import {z} from "zod";

export const SwiperSchema = z.object({
    id: z.number(),
    name: z.string(),
    src: z.string().url(),
});

export const SwiperPropsSchema = z.object({
    data: z.array(SwiperSchema),
});
export const SwiperPopupPropsSchema = z.object({
    data: z.function(),
});
export type SwiperType = z.infer<typeof SwiperSchema>;
export type SwiperProps = z.infer<typeof SwiperPropsSchema>;
export type SwiperPopupProps = z.infer<typeof SwiperPopupPropsSchema>;