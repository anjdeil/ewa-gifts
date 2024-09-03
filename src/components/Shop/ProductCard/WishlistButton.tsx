import Image from "next/image";
import React from "react";
import styles from "./styles.module.scss";

export default function WishlistButton({
    onClick,
    isLoading,
    checked = false
}: {
    onClick: () => void,
    isLoading: boolean
    checked?: boolean,
}) {
    return (
        <button className={`${styles["product-card__wishlist-button"]} ${isLoading && styles["product-card__wishlist-button_loading"]}`} onClick={onClick}>
            {checked ?
                <Image className={styles["product-card__wishlist-button-icon"]} src="/images/wishlist-filled.svg" width={24} height={24} alt="Wishlist" /> :
                <Image className={styles["product-card__wishlist-button-icon"]} src="/images/bottom-menu-icons/wishlist.svg" width={24} height={24} alt="Wishlist" />
            }
            <span className={styles["product-card__wishlist-button-text"]}>Obserwuj</span>
        </button>
    );
}