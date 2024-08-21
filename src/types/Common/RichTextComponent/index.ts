import { z } from "zod";

export const RichTextPropsSchema = z.object({
    link_text: z.string().optional(),
    link_url: z.string().optional(),
    text: z.string(),
    title: z.string().optional(),
    _type: z.string().optional(),
    className: z.string().optional(),
});

export type RichTextProps = z.infer<typeof RichTextPropsSchema>;