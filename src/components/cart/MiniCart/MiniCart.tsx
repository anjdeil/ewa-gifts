import React from "react";
import styles from "./styles.module.scss"
import Link from "next/link";
import { useFetchOrderQuery } from "@/store/wooCommerce/wooCommerceApi";
import { lineOrderItems } from "@/types";
import MiniCartItem from "./MiniCartItem";

const MiniCart = () => {
    const testOrderId = 83866;
    const totals = { total: 0 };

    const { data: orderData } = useFetchOrderQuery(testOrderId);

    return (
        <div className={styles["mini-cart"]}>
            <ul className={styles["mini-cart__items"]}>
                {orderData?.line_items && orderData.line_items.map((cartItem: lineOrderItems) => (
                    <MiniCartItem key={cartItem.product_id} cartItem={cartItem} />
                ))}
            </ul>
            <div className={styles["mini-cart__subtotal"]}>
                <span className={styles["mini-cart__subtotal-title"]}>
                    Subtotal
                </span>
                <span className={styles["mini-cart__subtotal-price"]}>
                    {totals.total} zł.
                </span>
            </div>
            <div className={styles["mini-cart__buttons"]}>
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

export default MiniCart;