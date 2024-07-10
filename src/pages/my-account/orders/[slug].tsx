import React, { FC } from "react";
import AccountLayout from "@/components/MyAccount/AccountLayout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import parseCookies from "@/Utils/parseCookies";
import axios, { AxiosResponse } from "axios";
import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";
import { OrderType } from "@/types/Services/woocommerce/OrderType";
import OrderItems from "@/components/MyAccount/OrderItems";
import AddressDetails from "@/components/MyAccount/AddressDetails";
import OrderTotals from "@/components/MyAccount/OrderTotals";
import Notification from "@/components/Layouts/Notification";

const redirectToLogin = {
    redirect: {
        destination: '/my-account/login',
        permanent: false,
    }
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { slug } = context.query;

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

        const orderResponse = await wooCommerceRestApi.get(`orders/${slug}`);

        if (orderResponse?.data?.customer_id !== userData?.id) return redirectToLogin;

        return {
            props: {
                order: orderResponse.data
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

interface OrderPropsType {
    order: OrderType
}

const Order: FC<OrderPropsType> = ({ order }) => {
    const dateCreated = order.date_created && new Date(order.date_created).toLocaleDateString("pl-PL", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const status = order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1);

    return (
        <AccountLayout
            title={`Zamówienie #${order.id}`}

            breadcrumbs={[
                { name: 'Zamówienia', url: '/my-account/orders' },
                { name: `#${order.id}`, url: `/my-account/${order.id}` }
            ]}
        >
            <Notification>
                Zamówienie #{order.id} złożone {dateCreated} jest obecnie {status}.
            </Notification>
            <OrderItems orderItems={order.line_items} />
            <OrderTotals order={order} />
            <AddressDetails order={order} />
        </AccountLayout>
    );
}

export default Order;