import React from "react";
import styles from "./styles.module.scss";
import ShopSidebar from "./ShopSidebar";

const MobileSidebar = () => {
    return (
        <div className={styles["mobile-sidebar"]}>
            <ShopSidebar />
        </div>
    );
}

export default MobileSidebar;