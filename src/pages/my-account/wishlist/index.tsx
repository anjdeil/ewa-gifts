import React, { useEffect } from "react";
import AccountLayout from "@/components/MyAccount/AccountLayout";
import Notification from "@/components/Layouts/Notification";
import { checkUserTokenInServerSide } from "@/Utils/checkUserTokenInServerSide";
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { WishlistItem } from "@/types";
import WishlistTable from "@/components/MyAccount/WishlistTable";
import { useFetchUserUpdateByIdMutation, useLazyFetchUserDataQuery } from "@/store/wordpress";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const customer = await checkUserTokenInServerSide('/my-account', context, 'userToken');
    if (!customer || !customer.id) return { redirect: { destination: "/my-account/login", permanent: false, } };

    return {
        props: {}
    }
}

function Wishlist() {

    const [cookie] = useCookies(['userToken']);
    const router = useRouter();

    const [fetchUserData, { data: userData, isLoading: isUserDataLoading }] = useLazyFetchUserDataQuery();
    const [fetchUserUpdateById, { isLoading: isUserUpdating }] = useFetchUserUpdateByIdMutation();

    const isLoading = isUserDataLoading || isUserUpdating;

    const wishlist = userData?.meta?.wishlist || [];

    useEffect(() => {
        if ("userToken" in cookie) {
            fetchUserData(cookie.userToken);
        }
    }, [cookie]);

    function handleDelete({ product_id, variation_id }: WishlistItem) {
        if (!userData?.meta?.wishlist || !cookie?.userToken) {
            router.push('/my-account/login');
            return;
        }

        const userWishlist = userData.meta.wishlist || [];

        const index = userWishlist.findIndex((item: WishlistItem) =>
            item.product_id === product_id && (!variation_id || item.variation_id === variation_id)
        )

        let updatedWishlist = null;

        if (index >= 0) {
            updatedWishlist = userWishlist.filter((_: WishlistItem, index2: number) => index2 !== index);
        } else {
            updatedWishlist = [
                ...userWishlist,
                {
                    product_id: product_id,
                    ...(variation_id && { variation_id: variation_id })
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
        <AccountLayout
            title="Obserwowane"
            breadcrumbs={[
                { name: 'Obserwowane', url: '/my-account/wishlist' }
            ]}
        >
            {!wishlist.length && !isUserDataLoading ?
                <Notification>
                    Żaden towar nie jest obserwowany
                </Notification> :
                <WishlistTable wishlist={wishlist} isLoading={isLoading} onDelete={handleDelete} />
            }
        </AccountLayout>
    );
}

export default Wishlist;