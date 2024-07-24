import React from "react";
import styles from "./styles.module.scss"
import Link from "next/link";
import { useFetchOrderQuery } from "@/store/wooCommerce/wooCommerceApi";
import MiniCart from "@/components/Cart/MiniCart";

const MiniCartPopup = () => {
    const testOrderId = 83866;
    const totals = { total: 0 };
    const { data: orderData, isLoading = false } = useFetchOrderQuery(testOrderId);

    return (
        <div className={styles["mini-cart-popup"]}>
            <div className={styles["mini-cart-popup__content"]}>
                <MiniCart isLoading={isLoading} lineItems={orderData?.line_items} />
            </div>
            <div className={styles["mini-cart-popup__subtotal"]}>
                <span className={styles["mini-cart-popup__subtotal-title"]}>
                    Subtotal
                </span>
                <span className={styles["mini-cart-popup__subtotal-price"]}>
                    {totals.total} zł.
                </span>
            </div>
            <div className={styles["mini-cart-popup__buttons"]}>
                <Link className={`desc link btn-primary ${styles["mini-cart__button"]}}`} style={{ display: "block", textAlign: 'center', marginBottom: '0.8em' }} href={'/'}>
                    Checkout
                </Link>
                <Link className={`desc link btn-secondary ${styles["mini-cart__button"]}}`} style={{ display: "block", textAlign: 'center' }} href={'/'}>
                    View cart
                </Link>
            </div>
        </div >
    );
}

export default MiniCartPopup;