import { Box, Skeleton } from '@mui/material';
import styles from './styles.module.scss';
import { useAppDispatch } from '@/hooks/redux';
import { updateCart } from '@/store/reducers/CartSlice';
import { CartTableProps } from '@/types/Cart';
import { FC } from 'react';
import { lineOrderItems } from '@/types/store/reducers/CartSlice';
import { CartTableRow } from './CartTableRow';
import React from 'react';

export const CartTable: FC<CartTableProps> = ({ products, total, isLoading, items }) =>
{
    const dispatch = useAppDispatch();
    const MemoizedCartTableRow = React.memo(CartTableRow);
    // const onProductChange = (product: lineOrderItems, count: number): void =>
    // {
    //     if (count >= 0)
    //     {
    //         dispatch(updateCart({
    //             id: product.product_id,
    //             quantity: count,
    //             ...(product.variation_id && { variationId: product.variation_id })
    //         }));
    //     }
    // };

    const onProductDelete = (product: lineOrderItems): void =>
    {
        dispatch(updateCart({
            id: product.product_id,
            quantity: 0,
            ...(product.variation_id && { variationId: product.variation_id })
        }));
    }

    return (
        <Box className={styles.CartTable}>
            <Box className={`${styles.CartTable__row_head} ${styles.CartTable__row}`}>
                <Box className={`${styles.CartTable__cell}`}>
                    Product
                </Box>
                <Box className={`${styles.CartTable__cell}`}>
                    Price
                </Box>
                <Box className={`${styles.CartTable__cell}`}>
                    Amount
                </Box>
                <Box className={`${styles.CartTable__cell}`}>
                    Total
                </Box>
            </Box >
            <Box className={styles.CartTable__tableBody}>
                {(isLoading && items.length > 0) ? (
                    <Box>
                        {
                            items.map(item => (
                                <Skeleton className={`${styles.CartTable__skeleton}`} key={item.product_id} animation="wave" />
                            ))
                        }
                    </Box>
                ) : (
                    products &&
                    products.map((product) => (
                        <MemoizedCartTableRow
                            key={product.id}
                            product={product}
                            onProductChange={() => { }}
                            onProductDelete={onProductDelete}
                            lineItems={items}
                            isLoading={isLoading}
                            total={total}
                        />
                    ))
                )}
            </Box>
        </Box >
    );
}
