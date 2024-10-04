import { WishlistItem } from "@/types";

export const saveWishlistToLocalStorage = (wishlist: WishlistItem[]) => {
    if (typeof window !== 'undefined') {
        const wishlistJSON = JSON.stringify(wishlist);
        localStorage.setItem('wishlist', wishlistJSON);
    }
}

export const getWishlistFromLocalStorage = (): WishlistItem[] | undefined => {
    if (typeof window !== 'undefined') {
        const wishlistJSON = localStorage.getItem('wishlist');

        if (!wishlistJSON) return undefined;

        const wishlist = JSON.parse(wishlistJSON);
        return wishlist;
    }

    return undefined;
}