import React, { FC } from "react";
import styles from "./styles.module.scss";
import ShopSidebar from "./ShopSidebar";

type PriceRange = {
    min: number,
    max: number
}

interface ShopSidebarPropsType {
    priceRange: PriceRange
}

const MobileSidebar: FC<ShopSidebarPropsType> = ({ priceRange }) => {
    return (
        <div className={styles["mobile-sidebar"]}>
            <ShopSidebar priceRange={priceRange} />
        </div>
    );
}

export default MobileSidebar;