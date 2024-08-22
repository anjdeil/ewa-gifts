import variables from "@/styles/variables.module.scss";
import React, { useEffect } from "react";
import styles from "./styles.module.scss"
import Link from "next/link";
import { useFetchCreateOrderMutation } from "@/store/wooCommerce/wooCommerceApi";
import MiniCart from "@/components/Cart/MiniCart";
import { useAppSelector } from "@/hooks/redux";
import { Skeleton } from "@mui/material";
import formatPrice from "@/Utils/formatPrice";
import getSubtotalByLineItems from "@/Utils/getSubtotalByLineItems";
import Notification from "@/components/Layouts/Notification";
import { WpWooError } from "@/types/Services/error";

const MiniCartPopup = () => {
    const [fetchCreateOrder, { data: orderData, isLoading, isError, error }] = useFetchCreateOrderMutation();
    const { items: cartItems, shippingLines } = useAppSelector(state => state.Cart);
    const fetchCreateOrderError = error as WpWooError;

    useEffect(() => {
        if (cartItems.length === 0) return;

        const createOrderRequestBody = {
            line_items: cartItems,
            shipping_lines: shippingLines
        };

        fetchCreateOrder(createOrderRequestBody);

    }, [cartItems]);

    const subtotal = (orderData && cartItems.length) && getSubtotalByLineItems(orderData.line_items);

    return (
        <div className={`${styles["mini-cart-popup"]} close-outside`}>
            <div className={styles["mini-cart-popup__content"]}>
                {isError ?
                    <Notification type="warning">{fetchCreateOrderError?.data?.message}</Notification> :
                    <MiniCart isLoading={isLoading} lineItems={orderData?.line_items} isEmpty={cartItems.length === 0} />
                }
            </div>
            <div className={styles["mini-cart-popup__subtotal"]}>
                <span className={styles["mini-cart-popup__subtotal-title"]}>
                    Kwota
                </span>
                <span className={styles["mini-cart-popup__subtotal-price"]}>
                    {isLoading ?
                        <Skeleton
                            sx={{
                                backgroundColor: variables.inputDarker,
                                borderRadius: '5px',
                                marginBottom: '10px'
                            }}
                            width={"70px"}
                            height={"1em"}
                            variant="rectangular"
                        >
                        </Skeleton> :
                        (subtotal) ?
                            <>{formatPrice(subtotal)}</> :
                            <>—</>
                    }
                </span>
            </div>
            <div className={styles["mini-cart-popup__buttons"]}>
                <Link className={`desc link btn-primary ${styles["mini-cart__button"]}}`} style={{ display: "block", textAlign: 'center', marginBottom: '0.8em' }} href={'/checkout'}>
                    Zamówienie
                </Link>
                <Link className={`desc link btn-secondary ${styles["mini-cart__button"]}}`} style={{ display: "block", textAlign: 'center' }} href={'/cart'}>
                    Zobacz koszyk
                </Link>
            </div>
        </div >
    );
}

export default MiniCartPopup;