import { z } from "zod";

export const CartItemSchema = z.object({
    id: z.number(),
    quantity: z.number(),
    type: z.string()
});

export type CartItem = z.infer<typeof CartItemSchema>