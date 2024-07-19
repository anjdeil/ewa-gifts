import { transColorsSchema } from "@/types/Services/transformers";
import { z } from "zod";

const ColorSliderPropsSchema = z.object({
    colors: z.array(transColorsSchema).nullable(),
    onColorClick: z.function()
        .args(z.string())
        .returns(z.void()),
    currentColor: z.string(),
    productId: z.number(),
    className: z.string()
});

export type ColorSliderProps = z.infer<typeof ColorSliderPropsSchema>;