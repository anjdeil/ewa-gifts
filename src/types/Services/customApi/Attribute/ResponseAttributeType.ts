import { z } from "zod";
import { AttributeSchema } from "./AttributeType";

export const ResponseAttributeSchema = z.object({
    status: z.string(),
    data: z.object({
        item: AttributeSchema
    }).optional(),
    error: z.object({
        message: z.string()
    }).optional()
});

export type ResponseAttributeType = z.infer<typeof ResponseAttributeSchema>;