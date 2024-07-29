import { z } from "zod";

export const CustomInputPropsSchema = z.object({
    fieldName: z.string().optional(),
    name: z.string().optional(),
    register: z.any().optional(),
    errors: z.any().optional(),
    className: z.string().optional(),
    isRequire: z.boolean().optional(),
    isPassword: z.boolean().optional(),
    isCheckbox: z.boolean().optional(),
    isNumeric: z.boolean().optional(),
    isPost: z.boolean().optional(),
    placeholder: z.string().optional(),
    onChange: z.function().args(z.unknown() as z.ZodType<React.ChangeEvent<HTMLInputElement>>).returns(z.void()).optional(),
    value: z.string().optional(),
    isTextarea: z.boolean().optional(),
    setValue: z.function().args(
        z.any(),
        z.any(),
        z.object({
            shouldValidate: z.boolean().optional(),
            shouldDirty: z.boolean().optional(),
            shouldTouch: z.boolean().optional(),
        }).optional()
    ).returns(z.void()).optional(),
    initialValue: z.string().nullable().optional(),
    checked: z.boolean().optional()
});

export type CustomInputProps = z.infer<typeof CustomInputPropsSchema>;