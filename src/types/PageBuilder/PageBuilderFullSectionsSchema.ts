import { z } from "zod";
import { productCarouselBuilderSchema, SliderBuild, TopSellerBuildSchema } from "../Sliders";
import { AdaptiveImagePropsSchema, CustomTabBuilderSchema, FeaturesBuild, HeroSchema, RichTextPropsSchema, SplitBuild, SplitImage } from "../Common";
import { CategoryBarsBuildSchema } from "@/components/PageBuilder";
import { BlogBuildSchema } from "../Blog";
import { GoogleReviewsBuildSchema } from "../GoogleReviews";

export const PageBuilderFullSectionsSchema = z.union([
    SliderBuild,
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
    productCarouselBuilderSchema
]);

export type PageBuilderSection = z.infer<typeof PageBuilderFullSectionsSchema>;