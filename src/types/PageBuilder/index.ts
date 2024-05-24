import { z } from "zod";
import { SliderBuild } from "../Sliders";
import { FeaturesBuild, HeroSchema, SplitBuild } from "../Common";

export const PageBuilderPropsSchema = z.array(
    z.union([SliderBuild, FeaturesBuild, HeroSchema, SplitBuild]).optional()
);

export type PageBuilderProps = z.infer<typeof PageBuilderPropsSchema>;