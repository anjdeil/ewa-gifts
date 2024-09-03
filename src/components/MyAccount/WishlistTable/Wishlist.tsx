import { useFetchProductsMinimizedMutation } from "@/store/custom/customApi";
import { WishlistItem } from "@/types";
import React, { useEffect } from "react";
import WishlistRow from "./WishlistRow";
import styles from "./styles.module.scss";
import { ProductsMinimizedType } from "@/types/Services/customApi/Product/ProductsMinimizedType";
import WishlistSkeleton from "./WishlistSkeleton";

export default function WishlistTable({
    wishlist,
    onDelete,
    isLoading = false
}: {
    wishlist: WishlistItem[],
    onDelete: (product: WishlistItem) => void,
    isLoading?: boolean
}) {
    const [fetchProductsMinimized, { data: productsData, isLoading: isProductsLoading }] = useFetchProductsMinimizedMutation();

    useEffect(() => {
        fetchProductsMinimized({
            products: wishlist
        });
    }, [wishlist]);

    const products = productsData?.data?.items as ProductsMinimizedType[];

    return (
        <div className={styles["wishlist"]}>
            {isLoading || isProductsLoading ?
                <WishlistSkeleton count={wishlist.length} /> :
                Boolean(products?.length) && products.map((product) =>
                    <WishlistRow key={product.id} product={product} onDelete={onDelete} />
                )}
        </div>
    );
}