import React from "react";
import styles from "./styles.module.scss";
import variables from "@/styles/variables.module.scss";
import { EwaButton } from "@/components/EwaComponents/EwaButton";

import getCirculatedPrice from "@/Utils/getCirculatedPrice";
import Price from "../Price";
const ProductTotals = ({ currentQuantity, circulatedPrices }) => {
    const circulatedPrice = getCirculatedPrice(currentQuantity, circulatedPrices);
    const total = circulatedPrice * currentQuantity;

    return (
        <div className={styles["product-totals"]}>
            <div className={styles["product-totals__totals"]}>
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
            <div className={styles["product-totals__button"]}>
                <EwaButton>
                    Dodaj do koszyka
                </EwaButton>
            </div>
        </div>
    )
}

export default ProductTotals;