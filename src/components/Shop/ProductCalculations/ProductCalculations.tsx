import React, { ChangeEvent, FC, useState } from "react";
import getCirculatedPrices from "@/Utils/getCirculatedPrices";
import ProductCirculations from "../ProductCirculations";
import ProductTotals from "../ProductTotals";
import { typeProductType } from "@/types";

interface ProductCalculations {
    product: typeProductType
}

const ProductCalculations: FC<ProductCalculations> = ({ product }) => {
    const productMeta = product.metaData;
    const productCirculationsMeta = productMeta.find(metaRow => metaRow.key === '_price_circulations');
    if (productCirculationsMeta === undefined) return;

    const productPrice = product.price || 0;
    const productStock = product.stock || 0;

    const productCirculations = productCirculationsMeta.value;
    const circulatedPrices = getCirculatedPrices(productPrice, productCirculations);

    const [currentQuantity, setCurrentQuantity] = useState(1);

    const onChangeQuantity = (evt: ChangeEvent<HTMLInputElement>) => {
        const inputValue = +evt.target.value;

        if (inputValue < 1) setCurrentQuantity(1);
        else if (inputValue > productStock) setCurrentQuantity(productStock);
        else setCurrentQuantity(inputValue);
    }

    return (
        <>
            <ProductCirculations
                stock={productStock}
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