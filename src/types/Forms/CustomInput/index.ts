import { z } from "zod";

export const CustomInputPropsSchema = z.object({
    fieldName: z.string(),
    name: z.string(),
    register: z.any().optional(),
    errors: z.any().optional(),
    className: z.string().optional(),
    isRequire: z.boolean().optional(),
    isPassword: z.boolean().optional(),
    isCheckbox: z.boolean().optional(),
    isNumeric: z.boolean().optional(),
});

export type CustomInputProps = z.infer<typeof CustomInputPropsSchema>;