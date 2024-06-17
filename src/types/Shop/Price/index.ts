import { z } from "zod";

const PricePropsSchema = z.object({
    price: z.number(),
    withoutTax: z.boolean().optional()
});

export type PriceProps = z.infer<typeof PricePropsSchema>;