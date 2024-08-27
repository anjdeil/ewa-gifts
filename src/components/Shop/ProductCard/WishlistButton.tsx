import Image from "next/image";
import React from "react";
import styles from "./styles.module.scss";

export default function WishlistButton({
    onClick,
    checked = false
}: {
    onClick: () => void,
    checked?: boolean
}) {
    return (
        <button className={styles["product-card__wishlist-button"]} onClick={onClick}>
            {checked ?
                <Image className={styles["product-card__wishlist-button-icon"]} src="/images/wishlist-filled.svg" width={24} height={24} alt="Wishlist" /> :
                <Image className={styles["product-card__wishlist-button-icon"]} src="/images/bottom-menu-icons/wishlist.svg" width={24} height={24} alt="Wishlist" />
            }
            <span className={styles["product-card__wishlist-button-text"]}>Obserwuj</span>
        </button>
    );
}