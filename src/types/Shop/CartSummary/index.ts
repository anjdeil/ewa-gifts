import { z } from "zod";

export const CartSummaryPropsSchema = z.object({
    total: z.number(),
    sum: z.number(),
    isLoading: z.boolean().optional()
});

export const CartSummaryRowPropsSchema = z.object({
    title: z.string(),
    value: z.string(),
    className: z.string(),
    isLoading: z.boolean().optional(),
    skeleton: z.object({
        width: z.string(),
        height: z.string(),
    }).optional()
});

export type CartSummaryProps = z.infer<typeof CartSummaryPropsSchema>;
export type CartSummaryRowProps = z.infer<typeof CartSummaryRowPropsSchema>;