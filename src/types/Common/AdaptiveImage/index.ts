import { z } from "zod";

const AdaptiveImagePropsSchema = z.object({
    isMobile: z.boolean(),
    imageUrl: z.string(),
    mobileImageUrl: z.string(),
    alt: z.string(),
    descOffset: z.string(),
    mobOffset: z.string().optional()
});

export type AdaptiveImageProps = z.infer<typeof AdaptiveImagePropsSchema>;
