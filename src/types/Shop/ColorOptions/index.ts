import { z } from "zod";
import { ProductOptionsSchema } from "../ProductCard";

export const AttributeColorOptionSchema = ProductOptionsSchema.extend({
    cssColor: z.string(),
    label: z.string()
});

export const ColorOptionsPropsSchema = z.object({
    colorAttributes: z.array(AttributeColorOptionSchema),
    baseColor: AttributeColorOptionSchema,
    onColorChange: z.function().args(z.string()).returns(z.void())
});

export type AttributeColorOption = z.infer<typeof AttributeColorOptionSchema>;
export type ColorOptionsProps = z.infer<typeof ColorOptionsPropsSchema>;