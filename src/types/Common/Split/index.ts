import { PageBuilderSectionSchema } from "@/types/PageBuilder";
import { z } from "zod";

export const SplitPropsSchema = z.object({
    leftContent: z.array(PageBuilderSectionSchema),
    rightContent: z.array(PageBuilderSectionSchema),
    isReversed: z.boolean().optional()
});

export const SplitBuild = z.object({
    split: z.any(),
    _type: z.string()
});

export const SplitImage = z.object({
    image: z.string(),
    title: z.string(),
    _type: z.string()
})

export const SplitContainerSchema = z.object({
    isMobile: z.boolean(),
    content: z.array(PageBuilderSectionSchema),
});

export const transformBuilderSplitPropsSchema = z.object({
    sections: z.array(PageBuilderSectionSchema),
    _type: z.string()
});

export type SplitProps = z.infer<typeof SplitPropsSchema>;
export type SplitContainer = z.infer<typeof SplitContainerSchema>;
export type SplitBuild = z.infer<typeof SplitBuild>;
export type transformBuilderSplitProps = z.infer<typeof transformBuilderSplitPropsSchema>;
