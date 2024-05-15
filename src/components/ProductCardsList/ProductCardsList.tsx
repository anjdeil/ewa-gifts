import { ProductType } from "@/types";
import { FC } from "react";
import { ProductCard } from "../ProductCard";
import styles from './style.module.scss';

interface ProductCardListProps
{
    isLoading: boolean;
    isError: boolean;
    products: ProductType[] | null;
}

export const ProductCardList: FC<ProductCardListProps> = ({ isLoading, isError, products }) =>
{
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>We cannot get the products</p>;
    return (
        <ul className={`list-reset ${styles.productList}`}>
            {products && products.map((product, index) => (
                <li key={index}>
                    <ProductCard key={index} product={product} />
                </li>
            ))}
        </ul>
    );
}