import { z } from "zod";

export const AdaptiveImagePropsSchema = z.object({
    isMobile: z.boolean().optional(),
    imageUrl: z.string(),
    mobileImageUrl: z.string().optional(),
    alt: z.string(),
    descOffset: z.string(),
    mobOffset: z.string().optional()
});

export type AdaptiveImageProps = z.infer<typeof AdaptiveImagePropsSchema>;
