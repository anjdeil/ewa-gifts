import React, { useState } from "react";
import getCirculatedPrice from "@/Utils/getCirculatedPrice";
import getCirculatedPrices from "@/Utils/getCirculatedPrices";
import ProductCirculations from "../ProductCirculations";
import ProductTotals from "../ProductTotals";

const ProductCalculations = ({ product }) => {
    const productMeta = product.metaData;
    const productCirculationsMeta = productMeta.find(metaRow => metaRow.key === '_price_circulations');
    if (productCirculationsMeta === undefined) return;

    const productPrice = product.price;
    const productCirculations = productCirculationsMeta.value;
    const circulatedPrices = getCirculatedPrices(productPrice, productCirculations);

    const [currentQuantity, setCurrentQuantity] = useState(1);

    const onChangeQuantity = (evt) => {
        let value = evt.target.value;
        if (value < 1) value = 1;
        if (value > product.stock) value = product.stock;

        setCurrentQuantity(value);
    }

    return (
        <>
            <ProductCirculations
                product={product}
                onChangeQuantity={onChangeQuantity}
                currentQuantity={currentQuantity}
                circulatedPrices={circulatedPrices}

            />
            <ProductTotals
                currentQuantity={currentQuantity}
                circulatedPrices={circulatedPrices}
            />
        </>
    )
}

export default ProductCalculations;