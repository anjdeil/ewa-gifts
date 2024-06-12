import React, { useState } from "react";
import styles from "./styles.module.scss";
import EwaInput from "@/components/EwaComponents/EwaInput";
import EwaSlider from "@/components/EwaComponents/EwaSlider";
import Price from "../Price";

const ProductCirculations = ({ product, onChangeQuantity, circulatedPrices, currentQuantity }) => {
    const lastCirculationQuantity = circulatedPrices.length ? circulatedPrices.at(-1).from : 10000;

    const circulationMarks = circulatedPrices.map(({ from }) => ({
        value: from,
        label: from
    }));
    return (
        <>
            <h3 className="product-page-h3">Cena za sztukę zależy od nakładu</h3>
            {Boolean(product.stock) && (
                <div className={styles["circulations-modifier"]}>
                    <EwaInput value={currentQuantity} type="number" onChange={onChangeQuantity} />
                    <EwaSlider
                        marks={circulationMarks}
                        min={1} max={lastCirculationQuantity}
                        getAriaLabel={() => 'Temperature range'}
                        value={currentQuantity}
                        onChange={onChangeQuantity}
                        valueLabelDisplay="off"
                    />
                </div>
            )}
            <div className={styles["circulations-table"]}>
                <div className={`${styles["circulations-table__col"]} ${styles["circulations-table__col_start"]}`}>
                    <div className={styles["circulations-table__col-header"]}>
                        Nakład (szt.)
                    </div>
                    <div className={styles["circulations-table__col-cell"]}>
                        Cena <br />
                        (bez VAT)
                    </div>
                </div>
                {circulatedPrices.map(({ label, from, price }, index, circulations) => {
                    const to = index !== circulations.length - 1 ? circulations[index + 1].from : Infinity;
                    const isActive = (currentQuantity >= from && currentQuantity < to) && product.stock;
                    return (
                        <div className={`${styles["circulations-table__col"]} ${isActive ? styles["circulations-table__col_active"] : ''}`}>
                            <div className={styles["circulations-table__col-header"]}>
                                {label}
                            </div>
                            <div className={styles["circulations-table__col-cell"]}>
                                <Price price={price} />
                            </div>
                        </div>
                    )
                })}

            </div>

        </>
    )
}

export default ProductCirculations;