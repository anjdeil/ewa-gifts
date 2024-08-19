import { z } from "zod";
import { AttributeTermSchema } from "./AttributeTermType";

export const StatisticAttributeSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    visible: z.boolean(),
    variation: z.boolean(),
    options: z.array(AttributeTermSchema)
});

export type StatisticAttributeType = z.infer<typeof StatisticAttributeSchema>;