import { z } from "zod";
import { ProductCardSchema } from "../ProductCard";

export const ProductCardAdaptiveColumns = z.object({
    mobile: z.number().optional(),
    tablet: z.number().optional(),
    desktop: z.number().optional(),
})

export const ProductCardListPropsSchema = z.object({
    isLoading: z.boolean(),
    isError: z.boolean(),
    products: z.array(ProductCardSchema),
    columns: ProductCardAdaptiveColumns.optional(),
});

export type ProductCardListProps = z.infer<typeof ProductCardListPropsSchema>;