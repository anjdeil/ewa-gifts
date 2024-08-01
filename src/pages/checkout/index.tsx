import { useCreateOrderWoo } from "@/hooks/useCreateOrderWoo";
import { RegistrationForm, FormHandle } from "@/components/Forms/RegistrationForm";
import { PageHeader } from "@/components/Layouts/PageHeader";
import { Section } from "@/components/Layouts/Section";
import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";
import { checkUserTokenInServerSide } from "@/Utils/checkUserTokenInServerSide";
import { Box, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { CheckoutLogin } from "./CheckoutLogin/CheckoutLogin";
import { useCookies } from "react-cookie";
import { useLazyFetchUserDataQuery } from "@/store/wordpress";
import { useLazyFetchCustomerDataQuery } from "@/store/wooCommerce/wooCommerceApi";
import MiniCart from "@/components/Cart/MiniCart";
import styles from './styles.module.scss';
import OrderTotals from "@/components/MyAccount/OrderTotals";
import { useAppSelector } from "@/hooks/redux";
import React, { useRef } from 'react';
import { CheckoutProps, userFieldsType } from "@/types/Pages/checkout";
// import { useRouter } from "next/router";
import { CustomInput } from "@/components/Forms/CustomInput";

const breadLinks = [{ name: 'Składania zamowienia', url: '/checkout' }];

const Checkout: FC<CheckoutProps> = ({ userData }) =>
{
    // const router = useRouter();
    const childRef = useRef<FormHandle>(null);
    const { createOrder, error: createError, createdOrder } = useCreateOrderWoo();
    const [isCreating, setCreating] = useState<boolean>(false);
    // const [isLoggedIn, setLoggedIn] = useState<boolean>(userData ? true : false);
    const [isModalOpen, setModalOpen] = useState<boolean>(userData ? false : true);
    const [userFields, setUserFields] = useState<userFieldsType | null>(userData ? userData : null);
    const [errMessage, setErrMessage] = useState<string | boolean>(false);
    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
    });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [cookie] = useCookies(['userToken']);
    const { items, shippingLines } = useAppSelector(state => state.Cart);
    const [fetchCheckUser, { data: jwtUser, error: jwtError }] = useLazyFetchUserDataQuery();
    const [fetchCustomerData, { data: customerData, error: customerError }] = useLazyFetchCustomerDataQuery();
    const pageTitle = 'Składania zamowienia';

    useEffect(() =>
    {
        if (items.length === 0)
        {
            // router.push('/cart');
        } else
        {
            createOrder(items, 'pending', shippingLines);
            setCreating(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])

    useEffect(() =>
    {
        if (createdOrder) console.log('Order', createdOrder);
    }, [createdOrder])

    useEffect(() =>
    {
        if (createdOrder)
        {
            setCreating(false);
        } else if (createError)
        {
            setCreating(false);
            // router.push('/cart');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createError, createdOrder])

    useEffect(() =>
    {
        if ("userToken" in cookie)
        {
            fetchCheckUser(cookie.userToken);
            setModalOpen(false);
        } else
        {
            setModalOpen(true);
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
        if (jwtError) alert('Server Error');
    }, [jwtError])

    useEffect(() =>
    {
        if (customerData)
        {
            setUserFields(customerData);
        }
    }, [customerData])

    useEffect(() =>
    {
        if (customerError) alert('Server Error');
    }, [customerError])

    function onContinueClick() { setModalOpen(false); }

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
        if (isSubmitDisabled)
        {
            setErrMessage("Zaznacz wszystkie zgody.");
            return;
        }
        if (childRef.current)
        {
            childRef.current.submit();
            setErrMessage(false);
        }
    }

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) =>
    {
        const { name, checked } = event.target;

        if (name === 'checkbox1')
        {
            const newCheckboxes = {
                checkbox1: checked,
                checkbox2: checked,
                checkbox3: checked,
                checkbox4: checked,
            };
            setCheckboxes(newCheckboxes);
            setIsSubmitDisabled(!checked);
        } else
        {
            setCheckboxes(prevState =>
            {
                const newCheckboxes = { ...prevState, [name]: checked };

                const allCheckedExceptCheckbox1 = newCheckboxes.checkbox2 && newCheckboxes.checkbox3 && newCheckboxes.checkbox4;

                if (allCheckedExceptCheckbox1)
                {
                    newCheckboxes.checkbox1 = true;
                } else if (!checked)
                {
                    newCheckboxes.checkbox1 = false;
                }

                const allChecked = Object.values(newCheckboxes).every(Boolean);
                setIsSubmitDisabled(!allChecked);
                return newCheckboxes;
            });
        }
    }

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
                            {/* <RegistrationForm
                                isCheckout={true}
                                ref={childRef}
                                userFields={userFields}
                                lineItems={items}
                                shippingLines={shippingLines}
                            /> */}
                            <RegistrationForm
                                isCheckout={true}
                                ref={childRef}
                                userFields={userFields}
                                lineItems={items}
                                shippingLines={shippingLines}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h2" className={`main-title ${styles.checkout__title}`}>
                                Twoje zamówienie
                            </Typography>
                            <MiniCart lineItems={createdOrder && createdOrder.line_items} showSubtotals={true} isLoading={isCreating} />
                            {items && <OrderTotals order={createdOrder && createdOrder} includeBorders={false} />}
                            <Box className={styles.checkout__checkboxes}>
                                <CustomInput
                                    fieldName="Zaznaczam wszystkie zgody."
                                    name='checkbox1'
                                    isCheckbox={true}
                                    checked={checkboxes.checkbox1}
                                    onChange={handleCheckboxChange}
                                />
                                <CustomInput
                                    fieldName="Przeczytałem/am i akceptuję regulamin i polityka prywatności."
                                    name='checkbox2'
                                    isCheckbox={true}
                                    checked={checkboxes.checkbox2}
                                    onChange={handleCheckboxChange}
                                />
                                <CustomInput
                                    fieldName="Wyrażam zgodę na przetwarzanie danych osobowych."
                                    name='checkbox3'
                                    isCheckbox={true}
                                    checked={checkboxes.checkbox3}
                                    onChange={handleCheckboxChange}
                                />
                                <CustomInput
                                    fieldName="Wyrażam zgodę na przetwarzanie danych osobowych w celach marketingowych."
                                    name='checkbox4'
                                    isCheckbox={true}
                                    checked={checkboxes.checkbox4}
                                    onChange={handleCheckboxChange}
                                />
                                {errMessage && <span className={'error'}>{errMessage}</span>}
                            </Box>
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
    const result = await checkUserTokenInServerSide('/', context, 'userToken');
    let userData = null;
    if (result && result.id)
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

    if (result && result.redirect) return { props: { userData: userData } };

    return { props: { userData: userData } };
}

export default Checkout;