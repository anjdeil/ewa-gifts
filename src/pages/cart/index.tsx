import Head from "next/head";
import { useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useCreateOrderWoo } from "@/hooks/useCreateOrderWoo";
// import { AddCoupon } from "@/components/Shop/AddCoupon";
import { Section } from "@/components/Layouts/Section";
import styles from './styles.module.scss';
import { CartSummary } from "@/components/Cart/CartSummary";
import { CartTable } from "@/components/Cart/CartTable";
import Notification from "@/components/Layouts/Notification";
import { PageHeader } from "@/components/Layouts/PageHeader";
import Link from "next/link";
import { lineOrderItems } from "@/types";
import { OrderType } from "@/types/Services/woocommerce/OrderType";

const Cart = () =>
{
    const { items, shippingLines } = useAppSelector(state => state.Cart);
    const [lineItems, setLineItems] = useState<lineOrderItems[]>([])
    const { createOrder, error: createError, createdOrder } = useCreateOrderWoo();
    const [currentOrder, setCurrentOrder] = useState<OrderType | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [isUpdating, setIsUpdating] = useState<boolean>(true);
    const breadLinks = [{ name: 'Koszyk', url: '/cart' }];

    useEffect(() =>
    {
        if (items.length === 0)
        {
            setCurrentOrder(null);
            setIsUpdating(false);
            return;
        }
        createOrder(items, 'pending', shippingLines);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])

    useEffect(() =>
    {
        if (createdOrder && createdOrder.line_items)
        {
            setCurrentOrder(createdOrder);
            setLineItems(createdOrder.line_items);
            setIsUpdating(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createdOrder])
    // OrderType

    useEffect(() =>
    {
        if (createError)
        {
            setIsUpdating(false);
            alert('Sorry, but it was server error.');
        }
    }, [createError])

    return (
        <>
            <Head>
                <title>Shopping cart</title>
                <meta name="description" content="Shopping cart page" />
            </Head>
            <main>
                <Section className="section" isContainer={true} isBreadcrumbs={true}>
                    <PageHeader title={"Koszyk"} breadLinks={breadLinks} />
                    <Box className={styles.Cart__content}>
                        <Box>
                            {(items.length === 0 && !isUpdating) && <Notification>
                                <Box className={styles.Cart__notification}>
                                    <Typography>
                                        Twój koszyk aktualnie jest pusty.
                                    </Typography>
                                    <Typography>
                                        <Link href={""}>Powrót do sklepu</Link>
                                    </Typography>
                                </Box>
                            </Notification>}
                            {items.length > 0 && lineItems.length > 0 && (
                                <CartTable
                                    products={lineItems}
                                    isLoading={isUpdating}
                                    total={createdOrder?.total}
                                />
                            )}
                            {/* <AddCoupon orderId={orderId && orderId} /> */}
                        </Box>
                        {currentOrder && <CartSummary order={currentOrder} isLoading={isUpdating} />}
                    </Box>
                </Section>
            </main>
        </>
    );
}

export default Cart;
