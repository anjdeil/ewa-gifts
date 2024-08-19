import { z } from "zod";

export const CounterPropsSchema = z.object({
    onCountChange: z.function().args(z.number()).returns(z.void()),
    value: z.number(),
    max: z.number(),
    min: z.number().optional(),
    isLoading: z.boolean().optional(),
    currentProduct: z.number().optional()
});

export type CounterProps = z.infer<typeof CounterPropsSchema>;