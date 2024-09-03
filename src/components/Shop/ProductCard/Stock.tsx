import { FC } from "react";
import styles from './styles.module.scss';

interface StockProps {
    quantity: number | undefined;
}

export const Stock: FC<StockProps> = ({ quantity }) => {
    return (
        <p className={styles["product-stock"]}>
            <span className={`${styles["product-stock-dot"]} ${quantity && styles['product-stock-dot_active']}`}></span>
            &nbsp;{quantity ? quantity : "Brak w magazynie"}
        </p>
    );
}