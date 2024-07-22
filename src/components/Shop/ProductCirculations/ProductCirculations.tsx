import React, { ChangeEvent, FC } from "react";
import styles from "./styles.module.scss";
import EwaInput from "@/components/EwaComponents/EwaInput";
import EwaSlider from "@/components/EwaComponents/EwaSlider";
import Price from "../Price";
import { circulatedPriceType } from "@/types/Shop/ProductCalculations";

interface ProductCirculationsPropsType
{
    stock: number,
    onChangeQuantity: (value: number) => void,
    circulatedPrices: circulatedPriceType[],
    currentQuantity: number
}

const ProductCirculations: FC<ProductCirculationsPropsType> = ({ stock, onChangeQuantity, circulatedPrices, currentQuantity }) =>
{
    const lastCirculationQuantity = circulatedPrices.length ? circulatedPrices.at(-1)?.from : 10000;

    const circulationMarks = circulatedPrices.map(({ from }) => ({
        value: from,
    }));

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) =>
    {
        onChangeQuantity(+evt.target.value);
    }

    const handleSliderChange = (evt: Event, value: number | number[]) =>
    {
        onChangeQuantity(value as number);
    }

    return (
        <>
            <h3 className="product-page-h3">Cena za sztukę zależy od nakładu</h3>
            {Boolean(stock) && (
                <div className={styles["circulations-modifier"]}>
                    <EwaInput value={currentQuantity} type="number" onChange={handleInputChange} />
                    <EwaSlider
                        marks={circulationMarks}
                        min={1} max={lastCirculationQuantity}
                        getAriaLabel={() => 'Quantity range'}
                        value={currentQuantity}
                        onChange={handleSliderChange}
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
                {circulatedPrices.map(({ label, from, price }, index, circulations) =>
                {
                    const to = index !== circulations.length - 1 ? circulations[index + 1].from : Infinity;
                    const isActive = (currentQuantity >= from && currentQuantity < to) && stock;
                    return (
                        <div key={from} className={`${styles["circulations-table__col"]} ${isActive ? styles["circulations-table__col_active"] : ''}`}>
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