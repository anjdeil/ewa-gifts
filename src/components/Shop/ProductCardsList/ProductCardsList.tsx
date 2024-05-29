import { FC } from "react";
import styles from './style.module.scss';
import { ProductCardListProps } from "@/types";
import { ProductCardListSkeleton } from "./ProductCardListSkeleton";
import { ProductCard } from "../ProductCard";
import { useMediaQuery } from "@mui/material";


export const ProductCardList: FC<ProductCardListProps> = ({ isLoading, isError, products, columns }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');

    if (isLoading) return <ProductCardListSkeleton />;
    if (isError) return <p>We cannot get the products</p>;

    const column = (isMobile && (columns?.mobile !== undefined ? columns.mobile : 2)) ||
        (isTablet && (columns?.tablet !== undefined ? columns.tablet : 4)) ||
        (columns?.desktop !== undefined ? columns.desktop : 4);

    return (
        <ul
            className={`list-reset ${styles.productList}`}
            style={{
                gridTemplateColumns: `repeat(${column}, 1fr)`,
            }}
        >
            {products && products.map((product, index) => (
                <li key={index}>
                    <ProductCard key={index} product={product} />
                </li>
            ))}
        </ul>
    );
}