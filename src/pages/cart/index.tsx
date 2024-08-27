import Head from "next/head";
import { useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useCreateOrderWoo } from "@/hooks/useCreateOrderWoo";
import { Section } from "@/components/Layouts/Section";
import styles from './styles.module.scss';
import { CartSummary } from "@/components/Cart/CartSummary";
import { CartTable } from "@/components/Cart/CartTable";
import Notification from "@/components/Layouts/Notification";
import { PageHeader } from "@/components/Layouts/PageHeader";
import Link from "next/link";
import { lineOrderItems } from "@/types/store/reducers/CartSlice";
import { OrderType } from "@/types/Services/woocommerce/OrderType";
import { CartItem } from "@/types/Cart";
import { useFetchProductsCirculationsMutation } from "@/store/custom/customApi";
import checkCartConflict from "@/Utils/checkCartConflict";
import getSubtotalByLineItems from "@/Utils/getSubtotalByLineItems";
import { MIN_SUBTOTAL_TO_CHECKOUT } from "@/Utils/consts";
import formatPrice from "@/Utils/formatPrice";

const breadLinks = [{ name: 'Koszyk', url: '/cart' }];

const Cart = () => {
    const { items, shippingLines } = useAppSelector(state => state.Cart);
    const { createOrder, error: createError, createdOrder } = useCreateOrderWoo();
    const [fetchProductsCirculations, { data: productsSpecsData, isLoading: isProductsSpecsLoading }] = useFetchProductsCirculationsMutation();
    const productsSpecs = productsSpecsData?.data ? productsSpecsData.data.items : [];

    const [lineItems, setLineItems] = useState<lineOrderItems[]>([]);
    const [currentOrder, setCurrentOrder] = useState<OrderType | null>(null);
    const [isUpdating, setIsUpdating] = useState<boolean>(true);
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isCartConflict, setCartConflict] = useState<boolean>(false);
    const [subtotal, setSubtotal] = useState<number>(0);
    const [isInsufficient, setInsufficient] = useState(false);

    /* Fetch circulations */
    useEffect(() => {
        const shortenedCartItems = items.map(({ product_id, variation_id }) => ({
            product_id,
            ...(variation_id && { variation_id })
        }));
        fetchProductsCirculations({
            products: shortenedCartItems
        });
    }, [fetchProductsCirculations, items]);

    useEffect(() => {
        setCartItems(items);

        if (items.length === 0) {
            setCurrentOrder(null);
            setIsUpdating(false);
            return;
        }

        setIsUpdating(true);
        createOrder(items, 'pending', shippingLines);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    useEffect(() => {
        if (createdOrder && createdOrder.line_items) {
            setCurrentOrder(createdOrder);
            setLineItems(createdOrder.line_items);
            setIsUpdating(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createdOrder])

    useEffect(() => {
        if (createError) {
            setIsUpdating(false);
        }
    }, [createError]);

    useEffect(() => {
        if (!isProductsSpecsLoading) {
            setCartConflict(checkCartConflict(cartItems, productsSpecs));
        }
    }, [cartItems, productsSpecs]);

    useEffect(() => {
        if (lineItems) {
            setSubtotal(getSubtotalByLineItems(lineItems));
        }
    }, [lineItems]);

    useEffect(() => {
        if (subtotal) {
            setInsufficient(subtotal < MIN_SUBTOTAL_TO_CHECKOUT);
        }
    }, [subtotal]);

    const insufficientSum = formatPrice(MIN_SUBTOTAL_TO_CHECKOUT - subtotal);
    return (
        <>
            <Head>
                <title>Koszyk</title>
            </Head>
            <main>
                <Section className="section" isContainer={true}>
                    <PageHeader title={"Koszyk"} breadLinks={breadLinks} />
                    {!cartItems.length && !isUpdating ?
                        <Notification>
                            <Box className={styles.Cart__notification}>
                                <p>
                                    Twój koszyk aktualnie jest pusty.
                                </p>
                                <p>
                                    <Link href={"/"}>Powrót do sklepu</Link>
                                </p>
                            </Box>
                        </Notification> :
                        createError ?
                            <Notification type="warning">{createError}</Notification> :

                            <Box className={styles.Cart__content}>

                                <Box>
                                    {isInsufficient &&
                                        <Notification type="warning">Do złożenia zamówienia brakuje jeszcze {insufficientSum}.</Notification>
                                    }
                                    <CartTable
                                        lineItems={lineItems}
                                        productsSpecs={productsSpecs}
                                        cartItems={cartItems}
                                        isLoading={isUpdating || isProductsSpecsLoading}
                                    />
                                    {/* <AddCoupon orderId={orderId && orderId} /> */}
                                </Box>
                                <CartSummary
                                    order={currentOrder}
                                    isLoading={isUpdating || isProductsSpecsLoading}
                                    disabled={isCartConflict || isUpdating || isProductsSpecsLoading || isInsufficient}
                                />
                            </Box>
                    }
                </Section>
            </main>
        </>
    );
}

export default Cart;