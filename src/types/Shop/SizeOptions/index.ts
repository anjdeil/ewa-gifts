import { z } from "zod";
import { ProductOptionsSchema } from "../ProductCard";

export const SizeOptionsPropsSchema = z.object({
    sizeAttributes: z.array(ProductOptionsSchema)
});

export type SizeOptionsProps = z.infer<typeof SizeOptionsPropsSchema>;