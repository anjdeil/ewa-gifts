import { z } from "zod";
import { AttributeSchema } from "./AttributeType";

export const ResponseAttributeListSchema = z.object({
    status: z.string(),
    data: z.object({
        items: z.array(AttributeSchema)
    }).optional(),
    error: z.object({
        message: z.string()
    }).optional()
});

export type ResponseAttributeListType = z.infer<typeof ResponseAttributeListSchema>;