import { z } from "zod";
import { ProductCardSchema } from "../ProductCard";

export const ProductCardListPropsSchema = z.object({
    isLoading: z.boolean(),
    isError: z.boolean(),
    products: z.array(ProductCardSchema).nullable(),
});

export type ProductCardListProps = z.infer<typeof ProductCardListPropsSchema>;