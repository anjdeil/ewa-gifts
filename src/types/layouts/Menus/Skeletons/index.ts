import { z } from "zod";

export const MenuSkeletonPropsSchema = z.object({
    elements: z.number().optional(),
    isColumn: z.boolean().optional(),
    width: z.string().optional(),
    height: z.string().optional(),
    gap: z.string().optional()
});

export type MenuSkeletonProps = z.infer<typeof MenuSkeletonPropsSchema>;