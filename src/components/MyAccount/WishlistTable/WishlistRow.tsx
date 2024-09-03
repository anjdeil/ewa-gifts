import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { IconButton } from "@mui/material";
import formatPrice from "@/Utils/formatPrice";
import Link from "next/link";
import { Stock } from "@/components/Shop/ProductCard/Stock";
import { AddButton, Counter } from "@/components/Buttons";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { CartItem } from "@/types/Cart";
import getCirculatedPrices from "@/Utils/getCirculatedPrices";
import getCirculatedPrice from "@/Utils/getCirculatedPrice";
import { updateCart } from "@/store/reducers/CartSlice";
import { ProductsMinimizedType } from "@/types/Services/customApi/Product/ProductsMinimizedType";
import { WishlistItem } from "@/types";

export default function WishlistRow({
    product,
    onDelete
}: {
    product: ProductsMinimizedType,
    onDelete: (product: WishlistItem) => void
}) {

    const dispatch = useAppDispatch();

    const { items: cartItems } = useAppSelector(state => state.Cart);
    const [cartMatch, setCartMatch] = useState<CartItem | null>(null)

    useEffect(() => {
        const cartMatch = cartItems.find((cartItem: CartItem) => {
            if (product.parent_id) {
                return product.id === cartItem.variation_id
            } else {
                return product.id === cartItem.product_id
            }
        });

        setCartMatch(cartMatch || null);
    }, [cartItems]);

    const circulatedPrices = getCirculatedPrices(product.price, product.price_circulations);
    const minQuantity = circulatedPrices ? circulatedPrices[0].from || 1 : 0;

    /* Add to cart */
    const handleAddToCart = (count: number) => {
        if (!product.stock_quantity) return;

        const circulatedPrice = circulatedPrices && getCirculatedPrice(count, circulatedPrices);
        const total = circulatedPrice && circulatedPrice * count;
        const supplier = product.attributes.find(({ name }) => name === "supplier")?.option;

        dispatch(updateCart({
            id: product.parent_id ? product.parent_id : product.id,
            quantity: count,
            supplier: 'pfconcept',
            ...(supplier && { supplier }),
            ...(product.parent_id && { variationId: product.id }),
            ...(total && { total: String(total) })
        }));
    }

    const handleClickDelete = () => {
        onDelete({
            product_id: product.parent_id ? product.parent_id : product.id,
            ...(product.parent_id && { variation_id: product.id }),
        });
    }

    return (
        <div className={styles["wishlist__row"]}>
            <div className={styles["wishlist__row-wrapper"]}>
                <IconButton className={styles["wishlist__row-delete"]} aria-label="delete" onClick={() => handleClickDelete()}>
                    <Image src="/images/trash.svg" width={19} height={19} alt="trash" />
                </IconButton>
                <Link href={`/product/${product.slug}`} className={styles["wishlist__row-info"]}>
                    <div className={styles["wishlist__row-image-wrapper"]}>
                        <Image
                            alt={product?.name}
                            src={product?.image?.src}
                            height={60}
                            width={60}
                            className={styles["wishlist__row-image"]}
                        />
                    </div>
                    <div className={styles["wishlist__row-titling"]}>
                        <div className={styles["wishlist__row-name"]}>{product.name}</div>
                        <div className={styles["wishlist__row-price"]}>Od {formatPrice(product.price)}</div>
                    </div>
                </Link>
            </div>
            <div className={styles["wishlist__row-stock"]}>
                <Stock quantity={product.stock_quantity} />
            </div>
            <div className={styles["wishlist__row-swatches"]}>
                {(!cartMatch || (!product.stock_quantity)) ?
                    <AddButton
                        onClickHandler={() => handleAddToCart(minQuantity)}
                        className={styles["product-card__button"]}
                        disabled={!product.price || !product.stock_quantity}
                    /> :
                    <Counter
                        value={cartMatch.quantity}
                        min={minQuantity}
                        max={product.stock_quantity}
                        onCountChange={handleAddToCart}
                        isLoading={false}
                    />
                }
            </div>
        </div>
    );
}