import { z } from 'zod';

export const wpWooErrorSchema = z.object({
    data: z.object({
        details: z.any(),
        message: z.string(),
    }),
    status: z.string()
});

export type WpWooError = z.infer<typeof wpWooErrorSchema>;