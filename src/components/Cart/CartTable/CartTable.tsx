import { Box, Skeleton } from '@mui/material';
import styles from './styles.module.scss';
import { CartTableProps } from '@/types/Cart';
import { FC } from 'react';
import { CartTableRow } from './CartTableRow';
import React from 'react';

export const CartTable: FC<CartTableProps> = ({ lineItems, productsSpecs, isLoading, cartItems }) => {

    const getProductSpecs = (productId: number, variationId: number) => {
        return productsSpecs.find(({ product_id, variation_id }) => {
            if (variationId) {
                return productId === product_id && variationId === variation_id;
            }
            return productId === product_id;
        });
    }

    return (
        <Box className={styles.cartTable}>
            <Box className={`${styles.cartTable__row} ${styles.cartTable__row_head}`}>
                <Box className={`${styles.cartTable__cell}`}>
                    Produkt
                </Box>
                <Box className={`${styles.cartTable__cell}`}>
                    Cena
                </Box>
                <Box className={`${styles.cartTable__cell}`}>
                    Ilość
                </Box>
                <Box className={`${styles.cartTable__cell}`}>
                    Kwota
                </Box>
            </Box >
            <Box className={styles.cartTable__tableBody}>
                {(isLoading && !lineItems.length) ? (
                    <Box>
                        {
                            cartItems.map((_item, index) => (
                                <Skeleton className={`${styles.cartTable__skeleton}`} key={index} animation="wave" />
                            ))
                        }
                    </Box>
                ) : (
                    lineItems &&
                    lineItems.map((lineItem) => (
                        <CartTableRow
                            key={lineItem.id}
                            lineItem={lineItem}
                            productSpecs={getProductSpecs(lineItem.product_id, lineItem.variation_id) || null}
                            isLoading={isLoading}
                        />
                    ))
                )}
            </Box>
        </Box >
    );
}
