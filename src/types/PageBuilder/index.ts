import { z } from "zod";
import { SliderBuild, TopSellerBuildSchema, productCarouselBuilderSchema } from "../Sliders";
import { AdaptiveImagePropsSchema, CustomTabBuilderSchema, FeaturesBuild, HeroSchema, RichTextPropsSchema, SplitBuild, SplitImage } from "../Common";
import { BlogBuildSchema } from "../Blog";
import { GoogleReviewsBuildSchema } from "../GoogleReviews";
import { CategoryBarsBuildSchema } from "../Common/CategoryBars";

export const PageBuilderSectionSchema = z.union([SliderBuild,
    FeaturesBuild,
    CategoryBarsBuildSchema,
    HeroSchema,
    TopSellerBuildSchema,
    CustomTabBuilderSchema,
    SplitBuild,
    SplitImage,
    BlogBuildSchema,
    AdaptiveImagePropsSchema,
    RichTextPropsSchema,
    GoogleReviewsBuildSchema,
    productCarouselBuilderSchema]);

export const PageBuilderPropsSchema = z.object({
    sections: z.array(PageBuilderSectionSchema)
});

export type PageBuilderSection = z.infer<typeof PageBuilderSectionSchema>;
export type PageBuilderProp = z.infer<typeof PageBuilderPropsSchema>;
