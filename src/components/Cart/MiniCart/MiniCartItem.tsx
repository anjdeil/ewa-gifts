/* eslint-disable react-hooks/exhaustive-deps */
import { lineOrderItems } from "@/types";
import React, { FC, useEffect, useState } from "react";
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
    const [quantity, setQuantity] = useState(cartItem.quantity);

    useEffect(() => {
        setQuantity(cartItem.quantity);
    }, [cartItem.quantity])

    useEffect(() => {
        dispatch(updateCart({
            id: cartItem.product_id,
            ...(cartItem.variation_id && { variationId: cartItem.variation_id }),
            quantity
        }));
    }, [quantity])

    const deleteCartItem = () => {
        dispatch(updateCart({
            id: cartItem.product_id,
            ...(cartItem.variation_id && { variationId: cartItem.variation_id }),
            quantity: 0
        }));
    }

    const cartItemName = transformCartItemName(cartItem);

    const subtotal = cartItem.price * cartItem.quantity;

    return (
        <li className={styles["mini-cart__item"]} key={cartItem.id}>
            <div className={styles["mini-cart__item-image-wrap"]}>
                <Image
                    alt={cartItem.name}
                    className={styles["mini-cart__item-image"]}
                    width={55}
                    height={55}
                    objectFit="contain"
                    objectPosition="center"
                    src={cartItem?.image?.src}
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
                {/* <input type="number" value={quantity} onChange={(evt) => setQuantity(+evt.target.value)} /> */}
            </div>
            {showSubtotal ?
                <p>{formatPrice(subtotal)}</p> :
                <div className={styles["mini-cart__item-delete-wrap"]}>
                    <button
                        className={styles["mini-cart__item-delete"]}
                        onClick={deleteCartItem}
                    >
                        <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 1L1 13M1 1L13 13" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            }
        </li>
    );
}

export default MiniCartItem;