import { z } from "zod";

export const circulatedPriceTypeSchema = z.object({
    from: z.number(),
    label: z.string(),
    price: z.number()
});

export type circulatedPriceType = z.infer<typeof circulatedPriceTypeSchema>