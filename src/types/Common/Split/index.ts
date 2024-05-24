import { FeaturesBuild, HeroSchema, PageBuilderPropsSchema, SliderBuild } from "@/types";
import { z } from "zod";

export const SplitSectionSchema = z.object({
    sections: z.union([SliderBuild, FeaturesBuild, HeroSchema]).optional(),
    _type: z.string()
});

export const SplitPropsSchema = z.object({
    leftContent: PageBuilderPropsSchema,
    rightContent: PageBuilderPropsSchema,
    isReversed: z.boolean().optional()
});

export const SplitBuild = z.object({
    split: z.array(SplitSectionSchema),
    _type: z.string()
})


export type SplitProps = z.infer<typeof SplitPropsSchema>;