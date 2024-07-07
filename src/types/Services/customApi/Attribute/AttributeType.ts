import { z } from "zod";

export const AttributeSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
});

export type AttributeType = z.infer<typeof AttributeSchema>;