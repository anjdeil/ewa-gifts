import { transColorsSchema } from "@/types/Services/fransformers";
import { z } from "zod";

export const ColorOptionsPropsSchema = z.object({
    colorAttributes: z.array(transColorsSchema),
    currentColor: z.string(),
    onColorChange: z.function().args(z.string()).returns(z.void())
});

export type ColorOptionsProps = z.infer<typeof ColorOptionsPropsSchema>;