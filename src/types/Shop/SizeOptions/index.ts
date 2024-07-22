import { z } from "zod";
import { defaultAttributesSchema, ProductOptionsSchema } from "../ProductCard";

export const SizeOptionsPropsSchema = z.object({
    sizeAttributes: z.array(z.union([ProductOptionsSchema, defaultAttributesSchema])),
    onSizeChange: z.function().args(z.string()).returns(z.void()),
    currentSize: z.string(),
    availableSizes: z.array(z.union([defaultAttributesSchema, ProductOptionsSchema])).nullable()
});

export type SizeOptionsProps = z.infer<typeof SizeOptionsPropsSchema>;