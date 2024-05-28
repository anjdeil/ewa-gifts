import { z } from "zod";

export const productBuilderSchema = z.object({
    id: z.string(),
    subtype: z.string(),
    type: z.string(),
    value: z.string()
});

export const productCarouselBuilderSchema = z.object({
    products: z.array(productBuilderSchema),
    title: z.string(),
    _type: z.string()
});

export type productBuilder = z.infer<typeof productBuilderSchema>;