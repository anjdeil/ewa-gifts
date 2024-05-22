import { z } from "zod";

export const FeaturesSchema = z.object({
    _type: z.string(),
    image: z.string(),
    text: z.string(),
});

const FeaturesPropsSchema = z.object({
    data: z.array(FeaturesSchema)
});

export type FeaturesType = z.infer<typeof FeaturesSchema>;
export type FeaturesProps = z.infer<typeof FeaturesPropsSchema>;