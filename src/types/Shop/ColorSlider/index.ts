import { z } from "zod";

const ColorSliderPropsSchema = z.object({
    colors: z.array(z.string()).nullable(),
    onColorClick: z.function()
        .args(z.string(), z.number())
        .returns(z.promise(z.void())),
    currentColor: z.string(),
    productId: z.number(),
    className: z.string()
});

export type ColorSliderProps = z.infer<typeof ColorSliderPropsSchema>;