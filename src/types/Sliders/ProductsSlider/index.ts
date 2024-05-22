import { ProductCardSchema } from "@/types/Shop";
import { z } from "zod";

const ProductSliderSchema = z.object({
    isError: z.boolean(),
    isLoading: z.boolean(),
    products: z.array(ProductCardSchema).nullable(),
});

export type ProductSliderType = z.infer<typeof ProductSliderSchema>;