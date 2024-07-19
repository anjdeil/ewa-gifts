import { z } from "zod";
import { ProductSchema } from "../ProductCard";

const ProductInfoPropsSchema = z.object({
    product: ProductSchema
});

export type ProductInfoProps = z.infer<typeof ProductInfoPropsSchema>;