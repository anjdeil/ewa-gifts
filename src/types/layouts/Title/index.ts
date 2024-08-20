import { z } from "zod";

const TitlePropsSchema = z.object({
    title: z.string(),
    isCenter: z.boolean().optional()
});

export const TitleBuilderSchema = z.object({
    is_center: z.boolean(),
    title: z.string(),
    _type: z.string()
});

export type TitleProps = z.infer<typeof TitlePropsSchema>;
export type TitleBuilder = z.infer<typeof TitleBuilderSchema>;