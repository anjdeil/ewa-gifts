import { z } from "zod";


export const FeaturesSchema = z.object({
    _type: z.string(),
    image: z.string(),
    text: z.string(),
});

export type FeaturesType = z.infer<typeof FeaturesSchema>;