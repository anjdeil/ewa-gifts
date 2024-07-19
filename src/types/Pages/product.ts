import { z } from "zod";
import { ProductSchema } from "../Shop";

const ProductPropsSchema = z.object({
    product: ProductSchema,
    breadLinks: z.array(z.object({
        name: z.string(),
        url: z.string()
    })),
})

export type ProductProps = z.infer<typeof ProductPropsSchema>;