import React, { useEffect } from "react";
import styles from "./styles.module.scss"
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { decreasedCartQuantity, deletedFromCart, increasedCartQuantity, updatedCartQuantity } from "@/store/reducers/CartSlice";
import { useAppDispatch } from "@/hooks/redux";

const MiniCart = () => {
    const dispatch = useAppDispatch();
    const { items } = useSelector(state => state.Cart);
    const cartRows = [];
    const totals = { total: 0 };

    // useEffect(() => {
    //     if (items.length > 0) {
    //         dispatch(fetchCartRows(items));
    //     }
    // }, [items]);

    return (
        <div className={styles["mini-cart"]}>
            <ul className={styles["mini-cart__items"]}>
                {cartRows && cartRows.map((row) => (
                    <li className={styles["mini-cart__item"]} key={row.id}>
                        <div className={styles["mini-cart__item-image-wrap"]}>
                            <Image
                                alt={row.name}
                                className={styles["mini-cart__item-image"]}
                                width={55}
                                height={55}
                                objectFit="contain"
                                objectPosition="center"
                                src={row?.image?.src}
                            />
                        </div>
                        <div className={styles["mini-cart__item-info"]}>
                            <p className={styles["mini-cart__item-name"]}>
                                {row.name}
                            </p>
                            <div className="cart-item-quty">
                                <span className="cart-item-quty__quty">{row.quantity}</span>
                                <svg className="cart-item-quty__x" width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 0.5L1 8.5M1 0.5L9 8.5" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span className="cart-item-quty__price">{row.price}</span>
                            </div>
                            <input type="nuber" value={row.quantity} onChange={(evt) => {
                                dispatch(updatedCartQuantity({
                                    id: row.id,
                                    type: row.type,
                                    quantity: evt.target.value
                                }))
                            }} />
                        </div>
                        <div className={styles["mini-cart__item-delete-wrap"]}>
                            <button
                                className={styles["mini-cart__item-delete"]}
                                onClick={() => dispatch(deletedFromCart({ id: row.id, type: row.type }))}
                            >
                                <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </li>
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