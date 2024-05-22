import React from 'react';
import styles from './style.module.scss';
import { ProductCardSkeleton } from '../ProductCard';

const products: JSX.Element[] = [];
for (let i = 0; i < 4; i++)
{
    products.push(<ProductCardSkeleton key={i} />);
}

export const ProductCardListSkeleton = () =>
{
    return (
        <ul className={`list-reset ${styles.productList}`}>
            {products.map((productSkeleton, index) => (
                <li key={index}>{productSkeleton}</li>
            ))}
        </ul>
    );
};