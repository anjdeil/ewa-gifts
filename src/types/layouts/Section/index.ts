import { z } from "zod";

export const SectionPropsSchema = z.object({
    children: z.any(),
    className: z.string(),
    isContainer: z.boolean().optional(),
    isBreadcrumbs: z.boolean().optional()
});

export type SectionProps = z.infer<typeof SectionPropsSchema>;