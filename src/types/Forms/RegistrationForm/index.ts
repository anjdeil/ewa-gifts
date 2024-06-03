import { z } from "zod";

export const RegistrationFormSchema = z.object({
    name: z.string().min(3, 'Required field'),
    lastName: z.string().min(3, 'Required field'),
    email: z.string().email('Please, type valid email'),
    password: z.string()
        .min(8, 'The password must contain at least 8 characters')
        .refine(value => /[A-Z]/.test(value), {
            message: 'The password must contain at least one capital letter'
        })
        .refine(value => /[a-z]/.test(value), {
            message: 'The password must contain at least one lowercase letter'
        })
        .refine(value => /[0-9]/.test(value), {
            message: 'The password must contain at least one digit'
        })
        .refine(value => /[^A-Za-z0-9]/.test(value), {
            message: 'The password must contain at least one special character'
        }),
    confirmPassword: z.string(),
    phoneNumber: z.string().min(9, 'Phone number must be at least 9 characters long')
        .max(15, 'Phone number cannot exceed 15 characters'),
    nip: z.string().min(10, 'The NIP must contain 10 characters')
        .max(10, 'The NIP must contain 10 characters'),
    companyName: z.string().min(1, 'Required field'),
    address: z.string().min(4, 'Required field'),
    postCode: z.string().min(5, 'The post code must contain 5 characters'),
    city: z.string().min(1, 'Required field'),
    terms: z.boolean().refine(value => value === true, {
        message: "You must agree to the terms",
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match.',
    path: ['confirmPassword']
})

export type RegistrationFormType = z.infer<typeof RegistrationFormSchema>;