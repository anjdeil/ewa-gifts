import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomInput } from "../CustomInput";
import { Box, styled } from "@mui/material";
import { useFetchUserRegistrationMutation } from "@/store/wooCommerce/wooCommerceApi";
import { useFetchUserTokenMutation } from "@/store/jwt/jwtApi";
import { useCookies } from 'react-cookie';
import React from 'react';
import { StyledBox } from "./StyleBox";

const RegistrationFormSchema = z.object({
    name: z.string().min(1, 'Required field'),
    lastName: z.string().min(1, 'Required field'),
    email: z.string().email('Please, type valid email'),
    password: z.string()
        .min(8, 'Пароль должен содержать не менее 8 символов')
        .refine(value => /[A-Z]/.test(value), {
            message: 'Пароль должен содержать хотя бы одну заглавную букву'
        })
        .refine(value => /[a-z]/.test(value), {
            message: 'Пароль должен содержать хотя бы одну строчную букву'
        })
        .refine(value => /[0-9]/.test(value), {
            message: 'Пароль должен содержать хотя бы одну цифру'
        })
        .refine(value => /[^A-Za-z0-9]/.test(value), {
            message: 'Пароль должен содержать хотя бы один специальный символ'
        }),
    confirmPassword: z.string(),
    phoneNumber: z.string().min(9, 'Phone number must be at least 10 characters long')
        .max(11, 'Phone number cannot exceed 15 characters')
        .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Invalid phone number format'),
    nip: z.string().optional(),
    companyName: z.string().min(1, 'Required field'),
    address: z.string().min(1, 'Required field'),
    postCode: z.string().min(4, 'Required field'),
    city: z.string().min(1, 'Required field'),
    terms: z.boolean().refine(value => value === true, {
        message: "You must agree to the terms",
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match.',
    path: ['confirmPassword']
})

type RegistrationForm = z.infer<typeof RegistrationFormSchema>;

export const RegistrationForm: FC = () =>
{
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<RegistrationForm>({
        resolver: zodResolver(RegistrationFormSchema)
    });

    const [fetchUserRegistration, { data, isError, error }] = useFetchUserRegistrationMutation();
    const [fetchUserToken, { data: userToken }] = useFetchUserTokenMutation();
    const [cookies, setCookie] = useCookies(['userToken']);

    const onSubmit = async (data: RegistrationForm) =>
    {
        // console.log('Form data:', data.password);

        const body = {
            email: data.email,
            first_name: data.name,
            last_name: data.lastName,
            username: data.email,
            password: data.password,
            billing: {
                company: data.companyName,
                address_1: data.address,
                address_2: data.nip,
                city: data.city,
                postcode: data.postCode,
                phone: data.phoneNumber,
            },
        }

        try
        {
            if (data.password !== data.confirmPassword)
            {
                throw new Error('Пароли не совпадают');
            }

            const response = await fetchUserRegistration(body);

            if (response && 'data' in response)
            {
                const userToken = await fetchUserToken({ username: 'admin', password: 'i5%9meiwQk9xzZx1dJ' }).unwrap();
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                setCookie('userToken', userToken.token, { path: '/', expires: tomorrow });
            }
        } catch (error)
        {
            console.error('Ошибка:', error);
            return { error: error.message };
        } finally
        {
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box display={'flex'} gap={'50px'} maxWidth={'1100px'} margin={'0 auto'}>
                <StyledBox>
                    <CustomInput fieldName="Name" name='name' register={register} errors={errors} />
                    <CustomInput fieldName="Surname" name='lastName' register={register} errors={errors} key={'lastName'} />
                    <CustomInput fieldName="Email" name='email' register={register} errors={errors} key={'email'} />
                    <CustomInput
                        fieldName="Password"
                        name='password'
                        register={register}
                        errors={errors}
                        isPassword={true}
                        key={'password'}
                    />
                    <CustomInput
                        fieldName="Repeat password"
                        name='confirmPassword'
                        register={register}
                        errors={errors}
                        isPassword={true}
                        key={'confirmPassword'}
                    />
                    <CustomInput fieldName="Phone Number" name='phoneNumber' register={register} errors={errors} key={'phoneNumber'} />
                    <CustomInput
                        fieldName="Twoje dane osobowe będą wykorzystywane do wspierania korzystania z tej witryny, zarządzania dostępem do konta oraz do innych celów opisanych w naszej polityka prywatności "
                        name='terms'
                        register={register}
                        errors={errors}
                        isCheckbox={true}
                        key={'terms'}
                    />
                    <button className="btn-primary btn" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                    {data && <p>{data.message}</p>}
                    {isError && <p dangerouslySetInnerHTML={{ __html: error.data?.message }} />}
                </StyledBox>
                <StyledBox>
                    <CustomInput fieldName="NIP (optional)" name='nip' register={register} errors={errors} isRequire={false} key={'nip'} />
                    <CustomInput fieldName="Company name" name='companyName' register={register} errors={errors} key={'companyName'} />
                    <CustomInput fieldName="Address" name='address' register={register} errors={errors} key={'address'} />
                    <CustomInput fieldName="Post code" name='postCode' register={register} errors={errors} key={'postCode'} />
                    <CustomInput fieldName="City" name='city' register={register} errors={errors} key={'city'} />
                </StyledBox>
            </Box>
        </form>
    )
}