import Head from "next/head";
import { useAppSelector } from "@/hooks/redux";
import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useCreateOrderWoo } from "@/hooks/useCreateOrderWoo";
import { useUpdateOrderWoo } from "@/hooks/useUpdateOrderWoo";
// import { AddCoupon } from "@/components/Shop/AddCoupon";
import { Section } from "@/components/Layouts/Section";
import styles from './styles.module.scss';
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import { CartItem, lineOrderItems } from "@/types";
import { CartSummary } from "@/components/Cart/CartSummary";
import { CartTable } from "@/components/Cart/CartTable";
import { OrderType } from "@/types/Services/woocommerce/OrderType";
import { useFetchUpdateOrderMutation } from "@/store/wooCommerce/wooCommerceApi";
import axios from "axios";

const Cart = () =>
{
    const { items } = useAppSelector(state => state.Cart);
    const { currentOrder: { orderId } } = useAppSelector(state => state.currentOrder);
    const { createOrder, createdOrder, error: createError } = useCreateOrderWoo();
    // const { updateOrder, updatedOrder, error: updateError } = useUpdateOrderWoo();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [products, setProducts] = useState<lineOrderItems[]>([]);
    const [currentOrder, setCurrentOrder] = useState<OrderType | null>(null);
    const [currentTotal, setCurrentTotal] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const breadLinks = [{ name: 'Koszyk', url: '/cart' }];
    const [data, setData] = useState(null);
    useEffect(() =>
    {
        if (orderId && items)
        {
            setIsUpdating(true);
            createUpdateOrder(orderId, items);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, orderId]);

    async function createUpdateOrder(orderId: number, items: CartItem[])
    {
        if (!items || items.length < 0) return;
        if (orderId)
        {
            updateOrderWoo(orderId, items);
            // updateOrder(items, orderId);
            return;
        } else
        {
            createOrder(items);
            return;
        }
    }

    const updateOrderWoo = async (orderId, items) =>
    {
        try
        {
            const response = await axios.put(`/api/woo/orders/${orderId}`, {
                credentials: {
                    line_items: [
                        ...items
                    ]
                }
            });
            setData(response.data);
            console.log('Order updated successfully:', response.data);
        } catch (error)
        {
            console.error('Error updating order:', error);
        }
    };

    // useEffect(() =>
    // {
    //     if (createdOrder)
    //     {
    //         updateLocalState(createdOrder.line_items, createdOrder, false);
    //     }

    //     if (updatedOrder)
    //     {
    //         console.log(updatedOrder);
    //         updateLocalState(updatedOrder.line_items, updatedOrder, false);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [createdOrder, updatedOrder])

    useEffect(() =>
    {
        if (createdOrder)
        {
            updateLocalState(createdOrder.line_items, createdOrder, false);
        }

        if (data)
        {
            console.log(data);
            updateLocalState(data.line_items, data, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createdOrder, data])


    // useEffect(() =>
    // {
    //     if (createError || updateError)
    //     {
    //         setIsUpdating(false);
    //         alert('Sorry, but it was server error.');
    //     }
    // }, [createError, updateError])

    // const updateLocalState = useCallback((line_items: lineOrderItems[], currentOrder: OrderType, isLoading: boolean): void =>
    // {
    //     if (!line_items) return;
    //     setProducts(line_items);
    //     setIsUpdating(isLoading);
    //     setCurrentOrder(currentOrder);
    //     setCurrentTotal(currentOrder.total);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [createdOrder, updatedOrder]);

    const updateLocalState = useCallback((line_items: lineOrderItems[], currentOrder: OrderType, isLoading: boolean): void =>
    {
        if (!line_items) return;
        setProducts(line_items);
        setIsUpdating(isLoading);
        setCurrentOrder(currentOrder);
        setCurrentTotal(currentOrder.total);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createdOrder, data]);

    return (
        <>
            <Head>
                <title>Shopping cart</title>
                <meta name="description" content="Shopping cart page" />
            </Head>
            <main>
                <Section className="section" isContainer={true} isBreadcrumbs={true}>
                    <Box className={styles.Cart__top}>
                        <Breadcrumbs links={breadLinks} />
                        <h1 className="sub-title">Koszyk</h1>
                    </Box>
                    <Box className={styles.Cart__content}>
                        <Box>
                            {products && <CartTable products={products} isLoading={isUpdating} total={currentTotal} />}
                            {/* <AddCoupon orderId={orderId && orderId} /> */}
                        </Box>
                        {currentOrder && <CartSummary order={currentOrder as OrderType} isLoading={isUpdating} />}
                    </Box>
                </Section>
            </main>
        </>
    );
}

export default Cart;
