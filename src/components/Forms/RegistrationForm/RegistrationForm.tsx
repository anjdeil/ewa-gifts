import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomInput } from "../CustomInput";
import { Box } from "@mui/material";
import { useFetchUserRegistrationMutation } from "@/store/wooCommerce/wooCommerceApi";
import { useFetchUserTokenMutation } from "@/store/jwt/jwtApi";
import { useCookies } from 'react-cookie';
import React from 'react';
import variables from '@/styles/variables.module.scss';
import { CartItem, RegistrationFormSchema, WpWooError } from "@/types";
import { z } from "zod";
import styles from './styles.module.scss';
import { registrationUserDataType, userFieldsType } from "@/types/Pages/checkout";
import { useCreateOrderWoo } from "@/hooks/useCreateOrderWoo";
import { ShippingLine } from "@/store/reducers/CartSlice";
import { useRouter } from "next/router";

interface RegistrationFormProps
{
    isCheckout?: boolean,
    userFields?: userFieldsType | null,
    lineItems?: CartItem[] | [],
    shippingLines?: ShippingLine[]
}

export interface FormHandle
{
    submit: () => void;
}

export const RegistrationForm = forwardRef<FormHandle, RegistrationFormProps>(({ isCheckout = false, userFields, lineItems, shippingLines }, ref) =>
{
    useImperativeHandle(ref, () => ({
        submit: () => handleSubmit(onSubmit)()
    }));

    const router = useRouter();
    const [cookie, setCookie] = useCookies(['userToken']);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [isShipping, setShipping] = useState<boolean>(false);
    const formSchema = RegistrationFormSchema(isLoggedIn, isCheckout, isShipping);
    type RegistrationFormType = z.infer<typeof formSchema>;

    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, setValue, reset } = useForm<RegistrationFormType>({
        resolver: zodResolver(formSchema)
    });

    function onShippingChange() { setShipping(prev => !prev); }

    const [fetchUserRegistration, { isError, error }] = useFetchUserRegistrationMutation();
    const [fetchUserToken] = useFetchUserTokenMutation();
    const { createOrder, error: createError, createdOrder } = useCreateOrderWoo();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars


    useEffect(() =>
    {
        if (createError)
        {
            alert("Server Error, please try again")
        } else if (createdOrder)
        {
            router.push(`/my-account/orders/${createdOrder.id}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createError, createdOrder])

    useEffect(() =>
    {
        if ("userToken" in cookie)
        {
            setLoggedIn(true);
        } else
        {
            setLoggedIn(false);
        }
    }, [cookie])

    const onSubmit = async (data: RegistrationFormType) =>
    {
        const body: registrationUserDataType = {
            id: userFields && userFields.id || '',
            email: data.email,
            first_name: data.name,
            last_name: data.lastName,
            username: data.name,
            password: data.password,
            billing: {
                first_name: data.name,
                last_name: data.lastName,
                company: data.companyName,
                address_1: data.address,
                address_2: data.nip,
                city: data.city,
                postcode: data.postCode,
                country: data.country,
                email: data.email,
                phone: data.phoneNumber,
            },
            shipping: {
                first_name: isShipping && data.nameShipping || '',
                last_name: isShipping && data.lastNameShipping || '',
                company: isShipping && data.companyNameShipping || '',
                address_1: isShipping && data.addressShipping || '',
                city: isShipping && data.cityShipping || '',
                postcode: isShipping && data.postCodeShipping || '',
                country: isShipping && data.countryShipping || '',
                email: data.email,
                phone: isShipping && data.phoneNumberShipping || '',
            }
        }

        try
        {
            if (body && isCheckout && lineItems)
            {
                if (isLoggedIn)
                {
                    createOrder(lineItems, 'processing', shippingLines, body);
                    return;
                } else
                {
                    const response = await fetchUserRegistration(body);
                    if (!response) return;
                    createOrder(lineItems, 'processing', shippingLines, body);
                    const userToken = await fetchUserToken({ username: data.email, password: data.password }).unwrap();
                    setCookie('userToken', userToken.token, {
                        path: '/',
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8)
                    });
                }
            } else
            {
                const response = await fetchUserRegistration(body);
                if (response && 'data' in response)
                {
                    const userToken = await fetchUserToken({ username: data.email, password: data.password }).unwrap();
                    setCookie('userToken', userToken.token, {
                        path: '/',
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8)
                    });
                }
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
       <div></div>
    )
});

RegistrationForm.displayName = 'RegistrationForm';
