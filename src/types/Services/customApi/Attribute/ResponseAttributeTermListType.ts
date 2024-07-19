import { z } from "zod";
import { AttributeTermSchema } from "./AttributeTermType";

export const ResponseAttributeTermListSchema = z.object({
    status: z.string(),
    data: z.object({
        items: z.array(AttributeTermSchema)
    }).optional(),
    error: z.object({
        message: z.string()
    }).optional()
});

export type ResponseAttributeTermListType = z.infer<typeof ResponseAttributeTermListSchema>;