import React, { FC } from "react";
import AccountLayout from "@/components/MyAccount/AccountLayout";
import OrderList from "@/components/MyAccount/OrderList";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import parseCookies from "@/Utils/parseCookies";
import axios, { AxiosResponse } from "axios";
import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";
import { OrderType } from "@/types/Services/woocommerce/OrderType";
import Notification from "@/components/Layouts/Notification";

const redirectToLogin = {
    redirect: {
        destination: '/my-account/login',
        permanent: false,
    }
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const cookies = context.req.headers.cookie;
    if (!cookies) return redirectToLogin;

    const cookieRows = parseCookies(cookies)
    if (!cookieRows.userToken) return redirectToLogin;

    try {
        const userResponse = await axios.get(`${process.env.SITE_URL}/wp-json/wp/v2/users/me`, {
            headers: {
                'Authorization': `Bearer ${cookieRows.userToken}`
            }
        });

        const userData = userResponse.data;
        if (!userData?.id) return redirectToLogin;

        const userOrdersResponse = await wooCommerceRestApi.get('orders', {
            customer: userData.id
        });

        return {
            props: {
                orders: userOrdersResponse.data
            }
        }

    } catch (error) {

        if (axios.isAxiosError(error)) {
            const response = error?.response as AxiosResponse;
            if (response?.data?.code === 'jwt_auth_invalid_token') return redirectToLogin;
        }

        return {
            notFound: true
        }
    }
}

interface OrdersPropsType {
    orders: OrderType[]
}

const Orders: FC<OrdersPropsType> = ({ orders }) => {
    return (
        <AccountLayout
            title="Zamówienia"
            breadcrumbs={[
                { name: 'Zamówienia', url: '/my-account/orders' }
            ]}
        >
            {orders?.length ?
                <OrderList orders={orders} /> :
                <Notification>
                    Żadne zamówienia nie zostały złożone
                </Notification>
            }
        </AccountLayout>
    );
}

export default Orders;