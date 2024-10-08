import { FC, useEffect } from "react";
import styles from './style.module.scss';
import { ProductCardListProps } from "@/types/Shop";
import { ProductCardListSkeleton } from "./ProductCardListSkeleton";
import { ProductCard } from "../ProductCard";
import { Box, useMediaQuery } from "@mui/material";
import { useCookies } from "react-cookie";
import { useFetchUserUpdateByIdMutation, useLazyFetchUserDataQuery } from "@/store/wordpress";
import { WishlistItem } from "@/types";
import { useRouter } from "next/router";


export const ProductCardList: FC<ProductCardListProps> = ({ isLoading = false, isError = false, products, columns, isShopPage = false }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');

    const column = (isMobile && (columns?.mobile !== undefined ? columns.mobile : 2)) ||
        (isTablet && (columns?.tablet !== undefined ? columns.tablet : 4)) ||
        (columns?.desktop !== undefined ? columns.desktop : 4);

    const [cookie] = useCookies(['userToken']);
    const router = useRouter();
    const [fetchUserData, { data: userData }] = useLazyFetchUserDataQuery();
    const [fetchUserUpdateById, { isLoading: userDataLoading }] = useFetchUserUpdateByIdMutation();

    useEffect(() => {
        if ("userToken" in cookie) {
            fetchUserData(cookie.userToken);
        }
    }, [cookie]);

    const handleDisire = (productId: number, variationId?: number) => {
        if (!userData?.meta?.wishlist || !cookie?.userToken) {
            router.push('/my-account/login');
            return;
        }

        const userWishlist = userData.meta.wishlist || [];

        const index = userWishlist.findIndex((item: WishlistItem) =>
            item.product_id === productId && (!variationId || item.variation_id === variationId)
        )

        let updatedWishlist = null;

        if (index >= 0) {
            updatedWishlist = userWishlist.filter((_: WishlistItem, index2: number) => index2 !== index);
        } else {
            updatedWishlist = [
                ...userWishlist,
                {
                    product_id: productId,
                    ...(variationId && { variation_id: variationId })
                }
            ]
        }

        const userUpdateRequestBody = {
            meta: {
                wishlist: updatedWishlist
            }
        };

        if (userData?.id) {
            fetchUserUpdateById({
                id: userData.id,
                body: userUpdateRequestBody
            });
        }
    }

    return (
        isLoading ?
            <ProductCardListSkeleton /> :
            isError ?
                <p>We cannot get the products</p> :
                <Box
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
                            wishlist={userData?.meta?.wishlist}
                            wishlistLoading={userDataLoading}
                        />
                    ))}
                </Box>
    );
}