import React, { FC } from "react";
import styles from "./styles.module.scss";
import ShopSidebar from "./ShopSidebar";
import { StatisticAttributeType } from "@/types/Services/customApi/Attribute/StatisticAttributeType";

type PriceRange = {
    min: number,
    max: number
}

interface ShopSidebarPropsType {
    availableAttributes: StatisticAttributeType[],
    priceRange: PriceRange
}

const MobileSidebar: FC<ShopSidebarPropsType> = ({ priceRange, availableAttributes }) => {
    return (
        <div className={styles["mobile-sidebar"]}>
            <ShopSidebar availableAttributes={availableAttributes} priceRange={priceRange} />
        </div>
    );
}

export default MobileSidebar;