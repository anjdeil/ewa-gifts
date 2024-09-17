import { z } from "zod";

export const FeaturesSchema = z.object({
    image: z.string(),
    text: z.string(),
    _type: z.string(),
});

const FeaturesPropsSchema = z.object({
    features: z.array(FeaturesSchema),
    isCentered: z.boolean().optional(),
});

export const FeaturesBuild = z.object({
    features: z.array(FeaturesSchema).optional(),
    features_centered: z.array(FeaturesSchema).optional(),
    _type: z.string(),
})

export type FeaturesType = z.infer<typeof FeaturesSchema>;
export type FeaturesProps = z.infer<typeof FeaturesPropsSchema>;
export type FeaturesBuild = z.infer<typeof FeaturesBuild>;