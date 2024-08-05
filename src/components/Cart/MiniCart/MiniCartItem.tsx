/* eslint-disable react-hooks/exhaustive-deps */
import { lineOrderItems } from "@/types";
import React, { FC } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useAppDispatch } from "@/hooks/redux";
import { updateCart } from "@/store/reducers/CartSlice";
import formatPrice from "@/Utils/formatPrice";
import { transformCartItemName } from "@/services/transformers/woocommerce/transformCartItemName";

interface MiniCartItemPropsType {
    cartItem: lineOrderItems,
    showSubtotal?: boolean
}

const MiniCartItem: FC<MiniCartItemPropsType> = ({ showSubtotal = false, cartItem }) => {
    const dispatch = useAppDispatch();

    const deleteCartItem = () => {
        dispatch(updateCart({
            id: cartItem.product_id,
            ...(cartItem.variation_id && { variationId: cartItem.variation_id }),
            quantity: 0
        }));
    }

    const cartItemName = transformCartItemName(cartItem);

    return (
        <li className={styles["mini-cart__item"]} key={cartItem.id}>
            <div className={styles["mini-cart__item-image-wrap"]}>
                <Image
                    alt={cartItemName}
                    className={styles["mini-cart__item-image"]}
                    width={55}
                    height={55}
                    objectFit="contain"
                    objectPosition="center"
                    src={cartItem?.image?.src}
                    unoptimized={true}
                />
            </div>
            <div className={styles["mini-cart__item-info"]}>
                <p className={styles["mini-cart__item-name"]}>
                    {cartItemName}
                </p>
                <div className="cart-item-quty">
                    <span className="cart-item-quty__quty">{cartItem.quantity}</span>
                    <svg className="cart-item-quty__x" width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 0.5L1 8.5M1 0.5L9 8.5" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span className="cart-item-quty__price">{formatPrice(cartItem.price)}</span>
                </div>
            </div>
            {showSubtotal ?
                <p>{formatPrice(+cartItem.subtotal)}</p> :
                <div className={styles["mini-cart__item-delete-wrap"]}>
                    <button
                        className={styles["mini-cart__item-delete"]}
                        onClick={deleteCartItem}
                    >
                        <svg aria-hidden width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 6.42871L2.12926 16.2291C2.24556 17.2384 3.10012 18.0001 4.11611 18.0001H9.88389C10.8999 18.0001 11.7544 17.2384 11.8707 16.2291L13 6.42871" stroke="black" strokeLinecap="round" />
                            <path d="M1 4.21411H13" stroke="black" strokeLinecap="round" />
                            <path d="M5 3.57143V3C5 1.89543 5.89543 1 7 1V1C8.10457 1 9 1.89543 9 3V3.57143" stroke="black" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            }
        </li>
    );
}

export default MiniCartItem;