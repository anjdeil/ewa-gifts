import { z } from "zod";
import { SliderBuild, TopSellerBuildSchema, productCarouselBuilderSchema } from "../Sliders";
import { AdaptiveImagePropsSchema, CustomTabBuilderSchema, FeaturesBuild, HeroSchema, RichTextPropsSchema, SplitBuild } from "../Common";
import { BlogBuildSchema } from "../Blog";
import { GoogleReviewsBuildSchema } from "../GoogleReviews";

export const PageBuilderPropsSchema = z.array(
    z.union([SliderBuild,
        FeaturesBuild,
        HeroSchema,
        SplitBuild,
        AdaptiveImagePropsSchema,
        RichTextPropsSchema,
        CustomTabBuilderSchema,
        BlogBuildSchema,
        TopSellerBuildSchema,
        GoogleReviewsBuildSchema,
        productCarouselBuilderSchema])
);

export const PageBuilderInnerSchema = z.object({
    sections: z.array(z.union([SliderBuild,
        FeaturesBuild,
        HeroSchema,
        AdaptiveImagePropsSchema,
        RichTextPropsSchema])),
    _type: z.string()
});

export type PageBuilderProps = z.infer<typeof PageBuilderPropsSchema>;
export type PageBuilderInner = z.infer<typeof PageBuilderInnerSchema>;
