import * as React from 'react';
import Image from 'next/image';
import { Box, Skeleton, Typography } from '@mui/material';
import styles from './styles.module.scss';
import { Counter } from '@/components/Buttons';
import { useAppDispatch } from '@/hooks/redux';
import { deletedFromCart, updatedCartQuantity } from '@/store/reducers/CartSlice';
import { CartTableProps, cartProduct } from '@/types/Cart';
import IconButton from '@mui/material/IconButton';
import { updatedCartQuantity } from '@/store/reducers/CartSlice';
import { useFetchCreateOrderMutation } from '@/store/wooCommerce/wooCommerceApi';


export const CartTable: React.FC<CartTableProps> = ({ products, isLoading }) =>
{
    const dispatch = useAppDispatch();

    const changeProductsAmount = React.useCallback((product: cartProduct, count: string) =>
    {
        dispatch(updatedCartQuantity({
            id: product.id,
            type: product.type,
            quantity: count,
        }));
    }, [dispatch]);

    const deleteProduct = (product: cartProduct) =>
    {
        dispatch(deletedFromCart({
            id: product.id,
            type: product.type,
        }));
    }
    // console.log(products);

    // const deleteProduct = () => {
    //     dispatch(deletedFromCart({
    //         id: ,
    //         type: ,
    //     }));
    // 

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
            <Box className={styles.CartTable__cell__row}>
                {products.map((product, index) => (
                    <Box key={index} className={`${styles.CartTable__row}`}>
                        <Box className={`${styles.cartItem}`}>
                            <Box>
                                <IconButton aria-label="delete" onClick={() => deleteProduct(product)}>
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
                                    {product.name}
                                </Typography>
                            </Box>
                        </Box>
                        <Box className={styles.CartTable__cell}>
                            <Typography variant='body1'>
                                {product.price} zł
                            </Typography>
                        </Box>
                        <Box className={styles.CartTable__cell}>
                            <Counter
                                count={product.quantity}
                                changeQuantity={(count) => changeProductsAmount(product, count)}
                                isLoading={isLoading}
                            />
                        </Box>
                        <Box className={styles.CartTable__cell}>
                            {isLoading ? (
                                <Skeleton width={'100px'} height={'50px'} animation="wave" />
                            ) : (
                                product.price * product.quantity + ' zł'
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box >
    );
}