import { z } from "zod";

export const SocialsSkeletonPropsSchema = z.object({
    elements: z.number(),
    isColumn: z.boolean().optional(),
    width: z.number(),
    height: z.number(),
    gap: z.string()
});

export type SocialsSkeletonProps = z.infer<typeof SocialsSkeletonPropsSchema>;