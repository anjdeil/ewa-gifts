import React, { FC } from "react";
import styles from "./styles.module.scss";
import Price from "../Price";

interface ProductTotalsPropsType {
    currentQuantity: number,
    circulatedPrice: number,
    total: number
}

const ProductTotals: FC<ProductTotalsPropsType> = ({ currentQuantity, circulatedPrice, total }) => {


    return (
        <div className={styles["product-totals"]}>
            <div className={styles["product-totals__total"]}>
                <div className={styles["product-totals__total-left"]}>
                    <div className={styles["product-totals__total-title"]}>Wartość zamówienia</div>
                    <div className={styles["product-totals__total-subtotal"]}>{currentQuantity} × <Price price={circulatedPrice} /></div>
                </div>
                <div className={styles["product-totals__total-right"]}>
                    <div className={styles["product-totals__total-price"]}>
                        <Price price={total} withoutTax={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductTotals;