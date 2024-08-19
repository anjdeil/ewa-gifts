import { Box, IconButton } from "@mui/material";
import Image from 'next/image';
import { FC } from "react";
import styles from './styles.module.scss';
import formatPrice from "@/Utils/formatPrice";
import { transformCartItemName } from "@/services/transformers/woocommerce/transformCartItemName";
import React from "react";
import { CartTableRowType } from "@/types/Cart";
import { Counter } from "@/components/Buttons";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import getCirculatedPrices from "@/Utils/getCirculatedPrices";
import getCirculatedPrice from "@/Utils/getCirculatedPrice";
import { updateCart } from "@/store/reducers/CartSlice";


export const CartTableRow: FC<CartTableRowType> = ({
    lineItem,
    productSpecs,
    isLoading
}) => {

    const productName = transformCartItemName(lineItem);
    const { items } = useAppSelector(state => state.Cart);
    const MemoizedCounter = React.memo(Counter);


    const dispatch = useAppDispatch();

    const matchedCartItem = items.find(({ product_id, variation_id }) => {
        if (lineItem.variation_id) {
            return lineItem.product_id === product_id && lineItem.variation_id === variation_id;
        }
        return lineItem.product_id === product_id;
    })

    if (!matchedCartItem || !productSpecs) return;


    const circulatedPrices = getCirculatedPrices(productSpecs.price, productSpecs.price_circulations)

    function handleCountChange(count: number) {
        if (!matchedCartItem) return;

        const circulatedPrice = circulatedPrices && getCirculatedPrice(count, circulatedPrices);
        const total = circulatedPrice && circulatedPrice * count;

        dispatch(updateCart({
            id: matchedCartItem.product_id,
            quantity: count,
            supplier: matchedCartItem.supplier,
            total: String(total),
            ...(matchedCartItem?.variation_id && { variationId: matchedCartItem.variation_id })
        }));
    }

    const handleDelete = () => {
        if (!matchedCartItem) return;

        dispatch(updateCart({
            id: matchedCartItem.product_id,
            quantity: 0,
            ...(matchedCartItem?.variation_id && { variationId: matchedCartItem.variation_id })
        }));
    }

    const rowPrice = +matchedCartItem.total / matchedCartItem.quantity;

    return (
        <Box className={`${styles.cartTable__row}`}>
            <Box className={`${styles.cartItem}`}>
                <Box className={styles.cartItem__delete}>
                    <IconButton aria-label="delete" onClick={() => handleDelete()}>
                        <Image src="/images/trash.svg" width={19} height={19} alt="trash" />
                    </IconButton>
                </Box>
                <Box>
                    <Image
                        className={styles.cartItem__image}
                        src={lineItem.image.src}
                        width={65}
                        height={65}
                        alt={lineItem.name}
                        unoptimized={true}
                    />
                </Box>
                <Box className={`${styles.cartItem__title}`}>
                    {productName}
                </Box>
            </Box>
            <Box className={styles.cartTable__cell}>
                <div className={styles.cartTable__cellKey}>
                    Cena
                </div>
                <div className={styles.cartTable__cellValue}>
                    {formatPrice(rowPrice)}
                </div>
            </Box>
            <Box className={`${styles.cartTable__cell} ${styles.cartTable__cell_counter}`}>
                <MemoizedCounter
                    value={matchedCartItem.quantity}
                    min={0}
                    max={productSpecs.stock_quantity}
                    onCountChange={handleCountChange}
                    isLoading={isLoading}
                />
                <div className={styles.cartTable__countCell}></div>

            </Box>
            <Box className={styles.cartTable__cell}>
                <div className={styles.cartTable__cellKey}>
                    Kwota
                </div>
                <div className={styles.cartTable__cellValue}>
                    {formatPrice(+matchedCartItem.total)}
                </div>
            </Box>
        </Box>
    )
}