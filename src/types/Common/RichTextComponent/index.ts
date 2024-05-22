import { z } from "zod";

const RichTextPropsSchema = z.object({
    richText: z.string(),
    className: z.string().optional()
});

export type RichTextProps = z.infer<typeof RichTextPropsSchema>;