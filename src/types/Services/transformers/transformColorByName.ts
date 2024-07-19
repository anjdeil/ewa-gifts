import { z } from "zod";

export const transColorsSchema = z.object({
    cssColor: z.string(),
    label: z.string()
});

export type transColorsType = z.infer<typeof transColorsSchema>