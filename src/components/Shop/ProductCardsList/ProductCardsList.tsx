import { FC, useEffect } from "react";
import styles from './style.module.scss';
import { ProductCardListProps } from "@/types/Shop";
import { ProductCardListSkeleton } from "./ProductCardListSkeleton";
import { ProductCard } from "../ProductCard";
import { useMediaQuery } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleWishlistItem } from "@/store/reducers/CartSlice";


export const ProductCardList: FC<ProductCardListProps> = ({ isLoading = false, isError = false, products, columns, isShopPage = false }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');

    if (isLoading) return <ProductCardListSkeleton />;
    if (isError) return <p>We cannot get the products</p>;

    const column = (isMobile && (columns?.mobile !== undefined ? columns.mobile : 2)) ||
        (isTablet && (columns?.tablet !== undefined ? columns.tablet : 4)) ||
        (columns?.desktop !== undefined ? columns.desktop : 4);

    const dispatch = useAppDispatch();
    const { wishlist } = useAppSelector(state => state.Cart);

    useEffect(() => {
        console.log(wishlist);

    }, [wishlist]);

    const handleDisire = (productId: number, variationId?: number) => {
        dispatch(toggleWishlistItem({
            product_id: productId,
            ...(variationId && { variation_id: variationId })
        }));
    }

    const checkDesired = (productId: number, variationId?: number): boolean => {
        const wishlistItem = wishlist.find((item) =>
            item.product_id === productId && (!variationId || item.variation_id === variationId)
        );

        // if (wishlistItem) {

        console.log(productId, variationId);
        // }


        return Boolean(wishlistItem);
    }

    return (
        <div
            className={`list-reset ${styles.productList} ${isShopPage && styles['productList_shop-page']}`}
            style={{
                gridTemplateColumns: `repeat(${column}, 1fr)`,
            }}
        >
            {products && products.map((product, i) => (
                <ProductCard
                    key={`${product.id}-${i}`}
                    product={product}
                    desirable
                    onDesire={handleDisire}
                    checkDesired={checkDesired}
                />
            ))}
        </div>
    );
}