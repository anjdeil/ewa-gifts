import { lineOrderItemsSchema } from "@/types";
import { Box, IconButton, Skeleton, Typography } from "@mui/material";
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from "react";
import { z } from "zod";
import styles from './styles.module.scss';
import { Counter } from "@/components/Buttons";
import { getLineItemQuantity } from "@/Utils/getLineItemQuantity";
import { CartItemSchema } from "@/types/Cart";
import formatPrice from "@/Utils/formatPrice";
import { transformCartItemName } from "@/services/transformers/woocommerce/transformCartItemName";
import React from "react";

export const CartTableRowProps = z.object({
    product: lineOrderItemsSchema,
    onProductChange: z.function().args(lineOrderItemsSchema, z.number()).returns(z.void()),
    onProductDelete: z.function().args(lineOrderItemsSchema).returns(z.void()),
    lineItems: z.array(CartItemSchema).nullable(),
    isLoading: z.boolean(),
    total: z.string()
});

export type CartTableRowType = z.infer<typeof CartTableRowProps>;

export const CartTableRow: FC<CartTableRowType> = ({
    product,
    onProductChange,
    onProductDelete,
    lineItems,
    isLoading,
    total }) =>
{
    const [count, setCount] = useState<number | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const productName = transformCartItemName(product);
    const productPrice = formatPrice(product.price);
    const MemoizedCounter = React.memo(Counter);

    useEffect(() =>
    {
        if (product && lineItems)
        {
            const hasItemQuantity = getLineItemQuantity(product.product_id, lineItems);
            if (hasItemQuantity) setCount(hasItemQuantity);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() =>
    {
        if (isLoading) return;
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() =>
        {
            onProductChange(product, Number(count));
        }, 1000)

        return () => { if (timerRef.current) clearTimeout(timerRef.current); }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onCountChange])

    function onCountChange(count: number)
    {
        if (count >= 0) setCount(count);
    }

    return (
        <Box className={`${styles.CartTable__row}`}>
            <Box className={`${styles.cartItem}`}>
                <Box className={styles.cartItem__delete}>
                    <IconButton aria-label="delete" onClick={() => onProductDelete(product)}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 1L1 13M1 1L13 13" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </IconButton>
                </Box>
                <Box>
                    <Image
                        src={product.image.src}
                        width={75}
                        height={75}
                        alt={product.name}
                    />
                </Box>
                <Box className={`${styles.cartItem__title}`}>
                    <Typography variant='h6' className='desc'>
                        {productName}
                    </Typography>
                </Box>
            </Box>
            <Box className={styles.CartTable__cell}>
                <Typography variant='body1'>
                    {isLoading ? (
                        <Skeleton width={'100px'} height={'50px'} animation="wave" />
                    ) : (
                        productPrice
                    )}
                </Typography>
            </Box>
            <Box className={styles.CartTable__cell}>
                {count && <MemoizedCounter
                    count={count}
                    onCountChange={onCountChange}
                    isLoading={isLoading}
                    currentProduct={product.id}
                />}
            </Box>
            <Box className={styles.CartTable__cell}>
                {isLoading ? (
                    <Skeleton width={'100px'} height={'50px'} animation="wave" />
                ) : (
                    total
                )}
            </Box>
        </Box>
    )
}