import Head from "next/head";
import { useAppSelector } from "@/hooks/redux";
import { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useCreateOrderWoo } from "@/hooks/useCreateOrderWoo";
import { useUpdateOrderWoo } from "@/hooks/useUpdateOrderWoo";
// import { AddCoupon } from "@/components/Shop/AddCoupon";
import { Section } from "@/components/Layouts/Section";
import styles from './styles.module.scss';
import { CartItem } from "@/types";
import { CartSummary } from "@/components/Cart/CartSummary";
import { CartTable } from "@/components/Cart/CartTable";
import { OrderType } from "@/types/Services/woocommerce/OrderType";
import Notification from "@/components/Layouts/Notification";
import { PageHeader } from "@/components/Layouts/PageHeader";
import Link from "next/link";

const Cart = () =>
{
    const { items } = useAppSelector(state => state.Cart);
    const { currentOrder: { orderId } } = useAppSelector(state => state.currentOrder);
    const { createOrder, createdOrder, error: createError } = useCreateOrderWoo();
    const { updateOrder, orderData, error: updateError } = useUpdateOrderWoo();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [currentOrder, setCurrentOrder] = useState<OrderType | null>(null);
    const [isUpdating, setIsUpdating] = useState<boolean>(true);
    const breadLinks = [{ name: 'Koszyk', url: '/cart' }];

    useEffect(() =>
    {
        if (orderId || items)
        {
            createUpdateOrder(orderId, items);
        } else
        {
            setIsUpdating(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, orderId]);

    async function createUpdateOrder(orderId: number | null, items: CartItem[])
    {
        if (items.length === 0) return;
        if (orderId)
        {
            updateOrder(items, orderId);
            return;
        } else
        {
            console.log('sds')
            console.log(items);
            createOrder(items);
            return;
        }
    }

    useEffect(() =>
    {
        if (createdOrder) updateLocalState(createdOrder, false);
        if (orderData) updateLocalState(orderData, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createdOrder, orderData])

    const updateLocalState = useCallback((currentOrder: OrderType, isLoading: boolean): void =>
    {
        if (!currentOrder || !currentOrder.line_items || !currentOrder.total) return;
        setCurrentOrder(currentOrder);
        setIsUpdating(isLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createdOrder, orderData]);

    useEffect(() =>
    {
        if (createError || updateError)
        {
            setIsUpdating(false);
            alert('Sorry, but it was server error.');
        }
    }, [createError, updateError])

    return (
        <>
            <Head>
                <title>Shopping cart</title>
                <meta name="description" content="Shopping cart page" />
            </Head>
            <main>
                <Section className="section" isContainer={true} isBreadcrumbs={true}>
                    <PageHeader title={"Koszyk"} breadLinks={breadLinks} />
                    {(!currentOrder && !isUpdating) && <Notification>
                        <Box className={styles.Cart__notification}>
                            <Typography>
                                Twój koszyk aktualnie jest pusty.
                            </Typography>
                            <Typography>
                                <Link href={""}>Powrót do sklepu</Link>
                            </Typography>
                        </Box>
                    </Notification>}
                    <Box className={styles.Cart__content}>
                        <Box>
                            {currentOrder && <CartTable
                                products={currentOrder.line_items}
                                isLoading={isUpdating}
                                total={currentOrder.total} />}
                            {/* <AddCoupon orderId={orderId && orderId} /> */}
                        </Box>
                        <CartSummary order={currentOrder as OrderType} isLoading={isUpdating} />
                    </Box>
                </Section>
            </main>
        </>
    );
}

export default Cart;
