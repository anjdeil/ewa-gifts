import { z } from "zod";

export const CounterPropsSchema = z.object({
    changeQuantity: z.function().args(z.any()).returns(z.void()),
    count: z.number(),
    isLoading: z.boolean().optional()
});

export type CounterProps = z.infer<typeof CounterPropsSchema>;