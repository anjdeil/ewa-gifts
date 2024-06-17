import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomInput } from "../CustomInput";
import { Box } from "@mui/material";
import React from 'react';
import axios from "axios";
import variables from '@/styles/variables.module.scss';
import Link from "next/link";

const NewPasswordSchema = z.object({
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
    code: z.string().min(1, 'Required field'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match.',
    path: ['confirmPassword']
});

type NewPassword = z.infer<typeof NewPasswordSchema>;

export const NewPassword: FC = () =>
{
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<NewPassword>({
        resolver: zodResolver(NewPasswordSchema)
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit = async (data: NewPassword) =>
    {
        setErrorMessage('');
        const body = {
            email: data.email,
            code: data.code,
            password: data.password,
        }

        try
        {
            const response = await axios({
                url: '/api/password/set-password',
                method: 'POST',
                data: body,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            return response.data;
        } catch (err)
        {
            if (err.response)
            {
                setErrorMessage(err.response.data?.message || "An unknown error occurred");
            }
        } finally
        {
            reset();
        }
    }

    return (
        <Box
            maxWidth={'500px'}
            margin={'0 auto'}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={'30px'}
                >
                    <CustomInput fieldName="Email" name='email' register={register} errors={errors} key={'email'} />
                    <CustomInput
                        fieldName="New password"
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
                    <CustomInput
                        fieldName="Code"
                        name='code'
                        register={register}
                        errors={errors}
                        key={'confirmPassword'}
                    />
                    <button className="btn-primary btn" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Reset'}</button>
                    {(isSubmitSuccessful && !errorMessage && !isSubmitting) &&
                        <p style={{ color: variables.successfully }}>
                            The password was successfully changed.
                            <Link style={{ marginLeft: '5px' }} href={"/my-account/login"}>
                                Try to Login.
                            </Link>
                        </p>
                    }
                    {errorMessage && (
                        <p style={{ color: variables.error }}>
                            {errorMessage}
                        </p>
                    )}
                </Box>
            </form>
        </Box>
    )
}