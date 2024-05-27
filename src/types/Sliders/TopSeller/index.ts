import { z } from "zod";
import { Images } from "../..";

export const TopSellerSchema = z.object({
    images: Images,
    title: z.string(),
    desc: z.string()
});

const TopSellerPropsSchema = z.object({
    data: z.array(TopSellerSchema),
});

export const TopSellerBuildSchema = z.object({
    topseller: z.string(),
    _type: z.string()
})

export type TopSeller = z.infer<typeof TopSellerSchema>;
export type TopSellerProps = z.infer<typeof TopSellerPropsSchema>;