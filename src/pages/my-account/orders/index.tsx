import React, { FC } from "react";
import AccountLayout from "@/components/MyAccount/AccountLayout";
import OrderList from "@/components/MyAccount/OrderList";
import wooCommerceRestApi from "@/services/wooCommerce/wooCommerceRestApi";
import { OrderType } from "@/types/Services/woocommerce/OrderType";
import Notification from "@/components/Layouts/Notification";
import { checkUserTokenInServerSide } from "@/Utils/checkUserTokenInServerSide";
import { GetServerSideProps, GetServerSidePropsContext } from "next"

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) =>
{
    const customer = await checkUserTokenInServerSide('/my-account', context, 'userToken');
    if (!customer || !customer.id) return { redirect: { destination: "/my-account/login", permanent: false, } };

    try
    {
        const userOrdersResponse = await wooCommerceRestApi.get('orders', {
            customer: customer.id
        });

        return {
            props: {
                orders: userOrdersResponse.data
            }
        }
    } catch (error)
    {
        return {
            notFound: true
        }
    }
}

interface OrdersPropsType
{
    orders: OrderType[]
}

const Orders: FC<OrdersPropsType> = ({ orders }) =>
{
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