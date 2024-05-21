import { z } from "zod";

export const CounterPropsSchema = z.object({
    onClickHandler: z.function().args(z.any()).returns(z.void()),
    count: z.number()
});

export type CounterProps = z.infer<typeof CounterPropsSchema>;