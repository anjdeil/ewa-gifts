import { z } from "zod";

export const Image = z.object({
    alt: z.string(),
    src: z.string()
});

export const Images = z.object({
    large: Image,
    small: Image,
});