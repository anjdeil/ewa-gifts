import { sections } from '@/types';
import { z } from 'zod';

export const CustomTabsSchema = z.object({
    sections: sections,
    title: z.string(),
    _type: z.string().optional()
});

export const CustomTabsPropsSchema = z.object({
    tabs: z.array(CustomTabsSchema)
});

export const CustomTabSchema = z.object({
    sections: z.any(),
    index: z.number(),
    value: z.number()
});

export const CustomTabBuilderSchema = z.object({
    tabs: z.any(),
    _type: z.string()
})

export type CustomTabsProps = z.infer<typeof CustomTabsPropsSchema>;
export type CustomTabType = z.infer<typeof CustomTabSchema>;