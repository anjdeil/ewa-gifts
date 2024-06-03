import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { CustomInput } from "../CustomInput";
import { Box, useMediaQuery } from "@mui/material";
import { useFetchUserRegistrationMutation } from "@/store/wooCommerce/wooCommerceApi";
import { useFetchUserTokenMutation } from "@/store/jwt/jwtApi";
import { useCookies } from 'react-cookie';
import React from 'react';
import { StyledBox } from "./StyleBox";
import variables from '@/styles/variables.module.scss';
import { RegistrationFormSchema, RegistrationFormType } from "@/types";

export const RegistrationForm: FC = () =>
{
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<RegistrationFormType>({
        resolver: zodResolver(RegistrationFormSchema)
    });

    const [fetchUserRegistration, { isError, error }] = useFetchUserRegistrationMutation();
    const [fetchUserToken] = useFetchUserTokenMutation();
    const [_, setCookie] = useCookies(['userToken']);
    const isMobile = useMediaQuery('(max-width: 768px)');

    const onSubmit = async (data: RegistrationFormType) =>
    {
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
            const response = await fetchUserRegistration(body);
            if (response && 'data' in response)
            {
                const userToken = await fetchUserToken({ username: data.email, password: data.password }).unwrap();
                setCookie('userToken', userToken.token,
                    {
                        path: '/',
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8)
                    });
            }
        } catch (error)
        {
            return { error: (error as Error).message };
        } finally
        {
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                display={'flex'}
                flexDirection={isMobile ? 'column' : 'row'}
                gap={isMobile ? '15px' : '50px'}
                maxWidth={'1100px'}
                margin={'0 auto'}>
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

                </StyledBox>
                <StyledBox>
                    <CustomInput
                        fieldName="Phone Number"
                        name='phoneNumber'
                        register={register}
                        errors={errors}
                        isNumeric={true}
                        key={'phoneNumber'}
                    />
                    <CustomInput
                        fieldName="NIP (optional)"
                        name='nip'
                        register={register}
                        errors={errors}
                        isRequire={false}
                        isNumeric={true}
                        key={'nip'}
                    />
                    <CustomInput fieldName="Company name" name='companyName' register={register} errors={errors} key={'companyName'} />
                    <CustomInput fieldName="Address" name='address' register={register} errors={errors} key={'address'} />
                    <CustomInput
                        fieldName="Post code"
                        name='postCode'
                        register={register}
                        errors={errors}
                        isNumeric={true}
                        key={'postCode'}
                    />
                    <CustomInput fieldName="City" name='city' register={register} errors={errors} key={'city'} />
                    <CustomInput
                        fieldName="Twoje dane osobowe będą wykorzystywane do wspierania korzystania z tej witryny, zarządzania dostępem do konta oraz do innych celów opisanych w naszej polityka prywatności "
                        name='terms'
                        register={register}
                        errors={errors}
                        isCheckbox={true}
                        isRequire={false}
                        key={'terms'}
                    />
                    <button className="btn-primary btn" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                    {(isSubmitSuccessful && !isError) && <p style={{ color: variables.successfully }}>
                        The account was created successfully
                    </p>}
                    {isError && <p style={{ color: variables.error }}
                        dangerouslySetInnerHTML={{ __html: error.data?.message }} />}
                </StyledBox>
            </Box>
        </form>
    )
}