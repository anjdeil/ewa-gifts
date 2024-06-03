import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomInput } from "../CustomInput";
import { Box } from "@mui/material";
import React from 'react';
import axios from "axios";
import variables from '@/styles/variables.module.scss';

const ResetPasswordSchema = z.object({
    email: z.string().email('Please, type valid email'),
});

type ResetPassword = z.infer<typeof ResetPasswordSchema>;

export const ResetPassword: FC = () =>
{
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<ResetPassword>({
        resolver: zodResolver(ResetPasswordSchema)
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit = async (data: ResetPassword) =>
    {
        try
        {
            const response = await axios({
                url: '/api/password/reset-password',
                method: 'POST',
                data: data,
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
            <h3 className="desc" style={{ marginBottom: '30px' }}>
                Forgot your password? Please enter your username or email address. We will send you in an email, the link needed to create a new password.
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={'30px'}
                >
                    <CustomInput
                        fieldName="E-mail "
                        name='email'
                        register={register}
                        errors={errors}
                    />
                    <button className="btn-primary btn" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Reset'}</button>
                    {(isSubmitSuccessful && !errorMessage) && <p style={{ color: variables.successfully }}>
                        Check your email to reset the password
                    </p>}
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