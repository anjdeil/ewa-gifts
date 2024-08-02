import variables from "@/styles/variables.module.scss";
import React, { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import MobilePopup from "../MobilePopup";
import getSubtotalByLineItems from "@/Utils/getSubtotalByLineItems";
import { useAppSelector } from "@/hooks/redux";
import { useFetchCreateOrderMutation } from "@/store/wooCommerce/wooCommerceApi";
import MiniCart from "@/components/Cart/MiniCart";
import { Skeleton } from "@mui/material";
import formatPrice from "@/Utils/formatPrice";
import Link from "next/link";

interface MobileCartPopupPropsType {
    onClose: () => void
}

const MobileCartPopup: FC<MobileCartPopupPropsType> = ({ onClose }) => {
    const [fetchCreateOrder, { data: orderData, isLoading }] = useFetchCreateOrderMutation();
    const { items: cartItems, shippingLines } = useAppSelector(state => state.Cart);

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
        <MobilePopup title="Koszyk" onClose={onClose}>
            <div className={styles["mobile-cart"]}>
                <div className={styles["mobile-cart__content"]}>
                    <MiniCart isLoading={isLoading} lineItems={orderData?.line_items} isEmpty={cartItems.length === 0} />
                </div>
                <div className={styles["mobile-cart__bottom"]}>
                    <div className={styles["mobile-cart__subtotal"]}>
                        <span className={styles["mobile-cart__subtotal-title"]}>
                            Kwota
                        </span>
                        <span className={styles["mobile-cart__subtotal-price"]}>
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
                    <div className={styles["mobile-cart__buttons"]}>
                        <Link className={`desc link btn-primary ${styles["mobile-cart__button"]}}`} style={{ display: "block", textAlign: 'center', marginBottom: '0.8em' }} href={'/checkout'}>
                            Zamówienie
                        </Link>
                        {orderData?.id ?
                            <Link className={`desc link btn-secondary ${styles["mobile-cart__button"]}}`} style={{ display: "block", textAlign: 'center' }} href={`https://new.ewagifts.pl/super-import-2/order-sheet.php?order_id=${orderData.id}`}>
                                Pobierz ofertę
                            </Link> :
                            <Skeleton
                                sx={{
                                    backgroundColor: variables.inputDarker,
                                    borderRadius: '10px',
                                }}
                                width={"100%"}
                                height={"42px"}
                                variant="rectangular"
                            >
                            </Skeleton>
                        }
                    </div>
                </div>
            </div>
        </MobilePopup>
    )
}

export default MobileCartPopup;