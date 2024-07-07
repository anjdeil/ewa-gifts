import { z } from "zod";

export const AttributeTermSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    menu_order: z.number().optional()
});

export type AttributeTermType = z.infer<typeof AttributeTermSchema>;