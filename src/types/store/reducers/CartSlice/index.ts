import { z } from "zod";

export const option = z.object({
    attributes: z.record(z.string()),
    id: z.number(),
    quantity: z.number()
});

export const cartItem = z.object({
    id: z.number(),
    imageUrl: z.string(),
    quantity: z.number(),
    options: z.array(option),
    type: z.string(),
});

export type cartItem = z.infer<typeof cartItem>;
