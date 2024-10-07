import { z } from "zod";
import { ProductAttributesSchema } from "../ProductCard";

export const AccordionProductPropsSchema = z.object({
    title: z.string(),
    data: z.array(ProductAttributesSchema).optional(),
    text: z.string().optional(),
});

export type AccordionProductProps = z.infer<typeof AccordionProductPropsSchema>;
