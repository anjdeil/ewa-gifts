// import { RegistrationForm } from "@/components/Forms/RegistrationForm";
import RegistrationForm, { FormHandle } from "@/components/Forms/RegistrationForm/RegistrationForm";
import { PageHeader } from "@/components/Layouts/PageHeader";
import { Section } from "@/components/Layouts/Section";
import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";
import { OrderTypeSchema } from "@/types/Services/woocommerce/OrderType";
import { checkCurrentOrderServerSide } from "@/Utils/checkCurrentOrderServerSide";
import { checkUserTokenInServerSide } from "@/Utils/checkUserTokenInServerSide";
import { Box, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { FC, useEffect, useState } from "react";
import { CheckoutLogin } from "./CheckoutLogin";
import { useCookies } from "react-cookie";
import { useLazyFetchUserDataQuery } from "@/store/wordpress";
import { useLazyFetchCustomerDataQuery } from "@/store/wooCommerce/wooCommerceApi";
import MiniCart from "@/components/Cart/MiniCart";
import styles from './styles.module.scss';
import OrderTotals from "@/components/MyAccount/OrderTotals";
import { useCreateOrderWoo } from "@/hooks/useCreateOrderWoo";
import { useAppSelector } from "@/hooks/redux";
import React, { useRef } from 'react';
import { userFieldsType } from "@/types/Pages/checkout";

const breadLinks = [{ name: 'Składania zamowienia', url: '/checkout' }];

const Checkout: FC<CheckoutProps> = ({ userData, orderData }) =>
{
    const childRef = useRef<FormHandle>(null);
    const [isCreating, setCreating] = useState<boolean>(false);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(userData ? true : false);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [userFields, setUserFields] = useState<userFieldsType | null>(null);
    const [cookie] = useCookies(['userToken']);
    const { items } = useAppSelector(state => state.Cart);
    const [fetchCheckUser, { data: jwtUser, error: jwtError }] = useLazyFetchUserDataQuery();
    const [fetchCustomerData, { data: customerData, error: customerError }] = useLazyFetchCustomerDataQuery();
    const { createOrder, error: createError, createdOrder } = useCreateOrderWoo();
    const pageTitle = 'Składania zamowienia';

    useEffect(() =>
    {
        if (userData)
        {
            setUserFields(userData);
            setModalOpen(false);
            setLoggedIn(true);
        } else
        {
            setModalOpen(true);
        }
    }, [userData]);

    useEffect(() =>
    {
        if ("userToken" in cookie)
        {
            fetchCheckUser(cookie.userToken);
            setLoggedIn(true);
        } else
        {
            setLoggedIn(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookie])

    useEffect(() =>
    {
        if (jwtUser && "id" in jwtUser) { fetchCustomerData(jwtUser.id); }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jwtUser])

    useEffect(() =>
    {
        if (customerData)
        {
            setUserFields(customerData);
        }
    }, [customerData])

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

    function onSubmitClick()
    {
        // userFields && items &&
        if (childRef.current)
        {

            setCreating(true);
            childRef.current.submit();
            // createOrder(items, userFields.id, 'processing');
        }
    }

    useEffect(() =>
    {
        if (userFields) console.log(userFields);
    }, [userFields])

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`${pageTitle} page`} />
            </Head>
            <main>
                <Section className={""} isBreadcrumbs={true} isContainer={true}>
                    <PageHeader title={pageTitle} breadLinks={breadLinks} />
                    <Box className={styles.checkout__content}>
                        <Box>
                            <RegistrationForm
                                isCheckout={true}
                                ref={childRef}
                                userFields={userFields}
                                lineItems={items}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h2" className={`main-title ${styles.checkout__title}`}>
                                Twoje zamówienie
                            </Typography>
                            <MiniCart lineItems={orderData?.line_items} showSubtotals={true} />
                            {orderData && <OrderTotals order={orderData} includeBorders={false} />}
                            {/* disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'} */}
                            <button
                                onClick={onSubmitClick}
                                className={`btn-primary btn ${styles.checkout__button}`}
                                type="submit">
                                Kupuję i płacę
                            </button>
                        </Box>
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

    if ('redirect' in orderData)
    {
        return {
            redirect: {
                ...orderData.redirect
            },
        }
    }

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

    if ('redirect' in result) return { props: { userData: userData, orderData: orderData } };
    if (result.notFound) return { notFound: true };

    return { props: { userData: userData, orderData: orderData } };
}

export default Checkout;