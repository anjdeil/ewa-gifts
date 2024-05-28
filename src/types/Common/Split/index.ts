import { PageBuilderPropsSchema } from "@/types/PageBuilder";
import { z } from "zod";

export const SplitPropsSchema = z.object({
    leftContent: PageBuilderPropsSchema,
    rightContent: PageBuilderPropsSchema,
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
    content: PageBuilderPropsSchema,
});

export type SplitProps = z.infer<typeof SplitPropsSchema>;
export type SplitContainer = z.infer<typeof SplitContainerSchema>;