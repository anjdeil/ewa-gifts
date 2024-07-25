import { LoginForm } from "@/components/Forms/LoginForm";
import { RegistrationForm } from "@/components/Forms/RegistrationForm";
import { PageHeader } from "@/components/Layouts/PageHeader";
import { Section } from "@/components/Layouts/Section";
import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";
import { OrderTypeSchema } from "@/types/Services/woocommerce/OrderType";
import { checkCurrentOrderServerSide } from "@/Utils/checkCurrentOrderServerSide";
import { checkUserTokenInServerSide } from "@/Utils/checkUserTokenInServerSide";
import { Box, Button, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { FC, useEffect, useState } from "react";
import { z } from "zod";
import { CheckoutLogin } from "./CheckoutLogin";
import { useCookies } from "react-cookie";
const breadLinks = [{ name: 'Składania zamowienia', url: '/checkout' }];

const userDetailsSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    company: z.string(),
    address_1: z.string(),
    address_2: z.string(),
    city: z.string(),
    postcode: z.string(),
    country: z.string(),
    state: z.string(),
    email: z.string().optional(),
    phone: z.string(),
})

const userDataSchema = z.object({
    id: z.string(),
    date_created: z.string(),
    date_created_gmt: z.string(),
    date_modified: z.string(),
    date_modified_gmt: z.string(),
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    role: z.string(),
    username: z.string(),
    billing: userDetailsSchema,
    shipping: userDetailsSchema,
    is_paying_customer: z.boolean(),
    avatar_url: z.string(),
})

const CheckoutPropsSchema = z.object({
    userData: userDataSchema.nullable(),
    orderData: OrderTypeSchema.nullable(),
})

type CheckoutProps = z.infer<typeof CheckoutPropsSchema>;

const Checkout: FC<CheckoutProps> = ({ userData, orderData }) =>
{
    const pageTitle = 'Składania zamowienia';
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [cookie] = useCookies(['userToken']);

    useEffect(() =>
    {
        if (userData)
        {
            console.dir(userData);
            setModalOpen(false);
            setLoggedIn(true);
        } else
        {
            setModalOpen(true);
        }
    }, [userData])


    useEffect(() =>
    {
        if ('userToken' in cookie)
        {
            onContinueClick();
        }
    }, [cookie])

    function onContinueClick()
    {
        setModalOpen(false);
    }

    useEffect(() =>
    {
        if (isModalOpen)
        {
            document.body.style.overflow = 'hidden';
        } else
        {
            document.body.style.overflow = 'unset';
        }
        return () =>
        {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    // if (orderData)
    // {
    //     console.dir(orderData);
    // }

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`${pageTitle} page`} />
            </Head>
            <main>
                <Section className={""} isBreadcrumbs={true} isContainer={true}>
                    <PageHeader title={pageTitle} breadLinks={breadLinks} />
                    <Box>
                        <RegistrationForm isCheckout={true} />
                    </Box>
                    {isModalOpen && <CheckoutLogin onContinueClick={onContinueClick} />}
                </Section>
            </main >
        </>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => 
{
    const orderData = await checkCurrentOrderServerSide('/cart', context, 'orderId');
    const result = await checkUserTokenInServerSide('/', context, 'userToken');
    let userData = null;
    if ('id' in result && orderData)
    {
        try
        {
            const resp = await wooCommerceRestApi.get(`customers/${result.id}`);
            if (!("data" in resp)) userData = { error: 'Server error' };
            userData = resp.data;

        } catch (err)
        {
            if (err instanceof Error)
            {
                userData = { error: err.message };
            } else
            {
                userData = { error: 'Unknown error' };
            }
        }
    }

    // if ('redirect' in result)
    // {
    //     return {
    //         redirect: {
    //             ...result.redirect
    //         },
    //     }
    // }
    if ('redirect' in result) return { props: { userData: userData, orderData: orderData } };
    if (result.notFound) return { notFound: true };

    return { props: { userData: userData, orderData: orderData } };
}

export default Checkout;