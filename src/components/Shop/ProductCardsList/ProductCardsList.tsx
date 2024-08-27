import { FC, useEffect, useState } from "react";
import styles from './style.module.scss';
import { ProductCardListProps } from "@/types/Shop";
import { ProductCardListSkeleton } from "./ProductCardListSkeleton";
import { ProductCard } from "../ProductCard";
import { useMediaQuery } from "@mui/material";
import { useLazyFetchUserDataQuery } from "@/store/wordpress";
import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { WishlistItem } from "@/types";
import { toggleWishlistItem } from "@/store/reducers/CartSlice";


export const ProductCardList: FC<ProductCardListProps> = ({ isLoading = false, isError = false, products, columns, isShopPage = false }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');

    const [_userWishlist, setUserWishlist] = useState([]);

    const dispatch = useAppDispatch();

    const { wishlist: localWishlist } = useAppSelector(state => state.Cart);

    const [cookie] = useCookies(['userToken']);
    const [fetchUserData, { data: userData, error }] = useLazyFetchUserDataQuery();

    useEffect(() => {
        if ("userToken" in cookie) {
            fetchUserData(cookie.userToken);
        }
    }, [cookie]);

    useEffect(() => {
        if (userData) {
            setUserWishlist(userData.meta.wishlist);
        }

    }, [userData]);

    const checkDesired = ({ product_id: checkedProductId, variation_id: checkedVariationId }: WishlistItem) => {
        return localWishlist.some(({ product_id, variation_id }) => product_id === checkedProductId && (!checkedVariationId || variation_id === checkedVariationId));
    }

    const handleOnDesire = (wishlistItem: WishlistItem) => {
        dispatch(toggleWishlistItem(wishlistItem));
    }


    if (isLoading) return <ProductCardListSkeleton />;
    if (isError) return <p>We cannot get the products</p>;

    const column = (isMobile && (columns?.mobile !== undefined ? columns.mobile : 2)) ||
        (isTablet && (columns?.tablet !== undefined ? columns.tablet : 4)) ||
        (columns?.desktop !== undefined ? columns.desktop : 4);

    return (
        <div
            className={`list-reset ${styles.productList} ${isShopPage && styles['productList_shop-page']}`}
            style={{
                gridTemplateColumns: `repeat(${column}, 1fr)`,
            }}
        >
            {products && products.map((product, i) => (
                <ProductCard key={`${product.id}-${i}`} product={product} desirable checkDesired={checkDesired} onDesire={handleOnDesire} />
            ))}
        </div>
    );
}