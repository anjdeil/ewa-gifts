import { z } from 'zod';

export const CustomTabsSchema = z.object({
    children: z.array(z.any()),
    titles: z.array(z.string()),
});

export const CustomTabSchema = z.object({
    children: z.array(z.any()),
    index: z.number(),
    value: z.number()
});

export type CustomTabsType = z.infer<typeof CustomTabsSchema>;
export type CustomTabType = z.infer<typeof CustomTabSchema>;