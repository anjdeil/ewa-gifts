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
import { MIN_SUBTOTAL_TO_CHECKOUT } from "@/Utils/consts";

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
    const isInsufficient = subtotal ? subtotal < MIN_SUBTOTAL_TO_CHECKOUT : false;
    const insufficientAmount = subtotal ? formatPrice(MIN_SUBTOTAL_TO_CHECKOUT - subtotal) : null;

    return (
        <div className={`${styles["mini-cart-popup"]} close-outside`}>
            <div className={styles["mini-cart-popup__content"]}>
                {isError ?
                    <Notification type="warning">{fetchCreateOrderError?.data?.message}</Notification> :
                    <>
                        {isInsufficient &&
                            <Notification type="warning">Do złożenia zamówienia brakuje jeszcze {insufficientAmount}.</Notification>
                        }
                        <MiniCart isLoading={isLoading} lineItems={orderData?.line_items} isEmpty={cartItems.length === 0} />
                    </>
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
                <Link className={`desc link btn-secondary ${styles["mini-cart__button"]}}`} style={{ display: "block", textAlign: 'center', marginBottom: '0.8em' }} href={'/cart'}>
                    Zobacz koszyk
                </Link>
                {isLoading ?
                    <Skeleton
                        sx={{
                            backgroundColor: variables.inputDarker,
                            borderRadius: '10px'
                        }}
                        width={"100%"}
                        height={"2.8em"}
                        variant="rectangular"
                    >
                    </Skeleton> :
                    isInsufficient ?
                        <div className={styles['mini-cart-popup__order-button-disabled']}>
                            Zamówienie
                        </div> :
                        <Link className={`desc link btn-primary ${styles["mini-cart__button"]}}`} style={{ display: "block", textAlign: 'center' }} href={'/checkout'}>
                            Zamówienie
                        </Link>
                }
            </div>
        </div >
    );
}

export default MiniCartPopup;