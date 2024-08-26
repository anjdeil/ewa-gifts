import { z } from "zod";
import { productCarouselBuilderSchema, SliderBuild, TopSellerBuildSchema } from "../Sliders";
import { AdaptiveImagePropsSchema, CustomTabBuilderSchema, FeaturesBuild, RichTextPropsSchema } from "../Common";
import { CategoryBarsBuildSchema } from "@/components/PageBuilder";
import { BlogBuildSchema } from "../Blog";
import { GoogleReviewsBuildSchema } from "../GoogleReviews";

export const PageBuilderSectionsSchema = z.union([
    SliderBuild,
    FeaturesBuild,
    CategoryBarsBuildSchema,
    TopSellerBuildSchema,
    CustomTabBuilderSchema,
    BlogBuildSchema,
    AdaptiveImagePropsSchema,
    RichTextPropsSchema,
    GoogleReviewsBuildSchema,
    productCarouselBuilderSchema
]);

export type PageBuilderSections = z.infer<typeof PageBuilderSectionsSchema>;