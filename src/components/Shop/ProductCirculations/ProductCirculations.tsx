import React, { useState } from "react";
import styles from "./styles.module.scss";
import EwaInput from "@/components/EwaComponents/EwaInput";
import variables from "@/styles/variables.module.scss";
import { Slider } from "@mui/material";

export const formatPrice = (price) => {
    return `${price.toFixed(2)} zł`;
}

export const getCirculatedPrices = (price, { type, circulations }) => {
    const circulatedPrices = [];
    const alreadyUsedCirculation = Object.values(circulations).at(-1);
    const uncirculatedPrice = type === 'direct' ? alreadyUsedCirculation : price / alreadyUsedCirculation;


    Object.entries(circulations).forEach(([quantity, value], index, circulationsEntries) => {
        const to = index !== circulationsEntries.length - 1 ? +circulationsEntries[index + 1][0] - 1 : false;
        const label = to ? `${+quantity || 1} - ${to}` : `> ${quantity}`;

        circulatedPrices.push({
            from: +quantity,
            label,
            price: type === 'direct' ? value : uncirculatedPrice * value
        });
    });

    return circulatedPrices;
}

const ProductCirculations = ({ product, onChange }) => {
    const productMeta = product.metaData;
    const productCirculationsMeta = productMeta.find(metaRow => metaRow.key === '_price_circulations');
    if (productCirculationsMeta === undefined) return;

    const productPrice = product.price;
    const productCirculations = productCirculationsMeta.value;
    const circulatedPrices = getCirculatedPrices(productPrice, productCirculations);
    const lastCirculationQuantity = circulatedPrices.length ? circulatedPrices.at(-1).from : 10000;
    const [currentQuantity, setCurrentQuantity] = useState(1);

    const onChangeQuantity = (evt) => {
        let value = evt.target.value;
        if (value < 1) value = 1;
        if (value > product.stock) value = product.stock;

        setCurrentQuantity(value);
    }

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
                    <Slider
                        marks={circulationMarks}
                        min={1} max={lastCirculationQuantity}
                        getAriaLabel={() => 'Temperature range'}
                        value={currentQuantity}
                        onChange={onChangeQuantity}
                        valueLabelDisplay="off"
                        sx={{
                            color: variables.accent,
                            ".MuiSlider-rail": {
                                opacity: 1,
                                backgroundColor: variables.inputLight,
                            },
                            ".MuiSlider-track": {
                                backgroundColor: variables.accentLight,
                                borderColor: variables.accentLight,
                            },
                            ".MuiSlider-thumb": {
                                "&:hover, &.Mui-focusVisible": {
                                    boxShadow: `0px 0px 0px 8px rgba(254, 203, 0, 0.2)`
                                },
                                "&.Mui-active": {
                                    boxShadow: `0px 0px 0px 14px rgba(254, 203, 0, 0.2)`
                                },
                                "&::before": {
                                    boxShadow: "none"
                                }
                            }
                        }}
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
                                {formatPrice(price)}
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    )
}

export default ProductCirculations;