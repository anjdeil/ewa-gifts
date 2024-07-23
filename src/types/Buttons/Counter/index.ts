import { z } from "zod";

export const CounterPropsSchema = z.object({
    onCountChange: z.function().args(z.number(), z.number().optional()).returns(z.void()),
    count: z.number(),
    isLoading: z.boolean().optional(),
    currentProduct: z.number().optional()
});

export type CounterProps = z.infer<typeof CounterPropsSchema>;