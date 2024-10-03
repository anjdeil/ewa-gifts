import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomInput } from "../CustomInput";
import { Box } from "@mui/material";
import { useFetchUserTokenMutation } from "@/store/jwt/jwtApi";
import { useCookies } from 'react-cookie';
import React from 'react';
import Link from "next/link";
import variables from '@/styles/variables.module.scss';
import { WpWooError } from "@/types/Services";

const LoginFormSchema = z.object({
    email: z.string().email('Please, type valid email'),
    password: z.string().min(1, 'This field is required.'),
    rememberMe: z.boolean().optional(),
});

type LoginForm = z.infer<typeof LoginFormSchema>;

export const LoginForm: FC = () =>
{
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<LoginForm>({
        resolver: zodResolver(LoginFormSchema)
    });

    const [fetchUserToken, { isError, error }] = useFetchUserTokenMutation();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setCookie] = useCookies(['userToken']);

    const onSubmit = async (data: LoginForm) =>
    {
        const body = {
            username: data.email,
            password: data.password,
        }

        try
        {
            const response = await fetchUserToken(body).unwrap();
            if (response && response.token)
            {
                const userToken = response.token;

                // const date = new Date();
                // date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
                // const expires = "expires=" + date.toUTCString();
                // document.cookie = 'userToken=' + userToken + ";expires=" + expires + ";path=/;domain=.ewagifts.pl;SameSite=None;Secure";

                // const options = {
                //     path: '/', expires: new Date(date.getTime() + (7 * 24 * 60 * 60 * 1000))
                // }

                const options = data.rememberMe
                    ? {
                        path: '.ewagifts.pl', expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8).toUTCString(),
                        sameSite: 'None',
                        secure: true
                    }
                    : { path: '/', sameSite: 'Lax', secure: true };
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setCookie('userToken', userToken, options);
            }
        } catch (error)
        {
            console.error('Warning:', error);

            if (error instanceof Error)
            {
                console.log(error);
                return { error: error.message };
            }

        } finally
        {
            reset();
        }
    };

    return (
        <Box
            maxWidth={'500px'}
            margin={'0 auto'}
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '30px' }}>
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
                    <CustomInput
                        fieldName="Password"
                        name='password'
                        register={register}
                        errors={errors}
                        isPassword={true}
                    />
                    <CustomInput
                        fieldName="Remember me"
                        name='rememberMe'
                        register={register}
                        errors={errors}
                        isCheckbox={true}
                    />
                    <button className="btn-primary btn" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Sign in'}</button>
                    {(isSubmitSuccessful && !isError) && <p style={{ color: variables.successfully }}>
                        You have successfully logged into my account.
                    </p>}
                    {isError && <p style={{ color: variables.error }}
                        dangerouslySetInnerHTML={{ __html: (error as WpWooError).data?.message }} />}
                </Box>
            </form>
            <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                <Link href={"/my-account/reset-password"} className="desc link">
                    Nie pamiętasz hasła?
                </Link>
                <Link href={"/my-account/registration"} className="desc link">
                    Nie masz konta? Zarejestruj się!
                </Link>
            </Box>
        </Box>
    )
}