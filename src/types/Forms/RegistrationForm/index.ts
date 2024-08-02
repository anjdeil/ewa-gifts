import { z } from "zod";

const passwordSchema = z.string()
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
    });

const nipSchema = z.string().min(10, 'Nip number must be 10 characters long')
    .max(10, 'Nip number must be 10 characters long');

const termsSchema = z.boolean().refine(value => value === true, {
    message: "You must agree to the terms",
});

const phoneSchema = z.string().min(9, 'Phone number must be at least 9 characters long')
    .max(15, 'Phone number cannot exceed 15 characters');

export const RegistrationFormShippingSchema = z.object({
    name: z.string().min(3, 'Required field'),
    lastName: z.string().min(3, 'Required field'),
    email: z.string().email('Please, type valid email'),
    companyName: z.string().min(1, 'Required field'),
    address: z.string().min(4, 'Required field'),
    postCode: z.string().min(5, 'The post code must contain 5 characters'),
    city: z.string().min(1, 'Required field'),
    country: z.string().min(1, 'Required field'),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    phoneNumber: phoneSchema,
    nip: nipSchema,
    terms: termsSchema,
    nameShipping: z.string().min(3, 'Required field'),
    lastNameShipping: z.string().min(3, 'Required field'),
    companyNameShipping: z.string().min(1, 'Required field'),
    addressShipping: z.string().min(4, 'Required field'),
    postCodeShipping: z.string().min(5, 'The post code must contain 5 characters'),
    cityShipping: z.string().min(1, 'Required field'),
    countryShipping: z.string().min(1, 'Required field'),
    phoneNumberShipping: phoneSchema,
});

export const RegistrationFormSchema = z.object({
    name: z.string().min(3, 'Required field'),
    lastName: z.string().min(3, 'Required field'),
    email: z.string().email('Please, type valid email'),
    companyName: z.string().min(1, 'Required field'),
    address: z.string().min(4, 'Required field'),
    postCode: z.string().min(5, 'The post code must contain 5 characters'),
    city: z.string().min(1, 'Required field'),
    country: z.string().min(1, 'Required field'),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    phoneNumber: phoneSchema,
    nip: nipSchema,
    terms: termsSchema,
})

export type RegistrationFormType = z.infer<typeof RegistrationFormSchema>;
export type RegistrationFormShippingType = z.infer<typeof RegistrationFormShippingSchema>;

// export const RegistrationFormSchema = (isLoggedIn: boolean, isCheckout: boolean = false, isShipping: boolean = false) =>
// {
//     const schema = z.object({
//         name: z.string().min(3, 'Required field'),
//         lastName: z.string().min(3, 'Required field'),
//         email: z.string().email('Please, type valid email'),
//         companyName: z.string().min(1, 'Required field'),
//         address: z.string().min(4, 'Required field'),
//         postCode: z.string().min(5, 'The post code must contain 5 characters'),
//         city: z.string().min(1, 'Required field'),
//         country: z.string().min(1, 'Required field'),
//         password: !isLoggedIn ? passwordSchema : z.string().optional(),
//         confirmPassword: !isLoggedIn ? z.string() : z.string().optional(),
//         phoneNumber: phoneSchema,
//         nip: nipSchema,
//         terms: !isCheckout ? termsSchema : z.string().optional(),
//         nameShipping: isShipping ? z.string().min(3, 'Required field') : z.string().optional(),
//         lastNameShipping: isShipping ? z.string().min(3, 'Required field') : z.string().optional(),
//         companyNameShipping: isShipping ? z.string().min(1, 'Required field') : z.string().optional(),
//         addressShipping: isShipping ? z.string().min(4, 'Required field') : z.string().optional(),
//         postCodeShipping: isShipping ? z.string().min(5, 'The post code must contain 5 characters') : z.string().optional(),
//         cityShipping: isShipping ? z.string().min(1, 'Required field') : z.string().optional(),
//         countryShipping: isShipping ? z.string().min(1, 'Required field') : z.string().optional(),
//         phoneNumberShipping: isShipping ? phoneSchema : z.string().optional(),
//     });

//     return schema.refine((data) =>
//     {
//         if (!isCheckout) return data.password === data.confirmPassword;
//         return true;
//     }, {
//         message: 'Passwords do not match.',
//         path: ['confirmPassword']
//     });
// };