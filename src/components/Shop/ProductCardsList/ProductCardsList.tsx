import { FC } from "react";
import styles from './style.module.scss';
import { ProductCardListProps } from "@/types";
import { ProductCardListSkeleton } from "./ProductCardListSkeleton";
import { ProductCard } from "../ProductCard";

export const ProductCardList: FC<ProductCardListProps> = ({ isLoading, isError, products }) =>
{
    if (isLoading) return <ProductCardListSkeleton />;
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