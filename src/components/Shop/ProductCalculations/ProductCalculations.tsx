import React, { FC, useState } from "react";
import getCirculatedPrices from "@/Utils/getCirculatedPrices";
import ProductCirculations from "../ProductCirculations";
import ProductTotals from "../ProductTotals";
import { typeProductType } from "@/types";

interface ProductCalculations
{
    product: typeProductType
}

const ProductCalculations: FC<ProductCalculations> = ({ product }) =>
{
    const [currentQuantity, setCurrentQuantity] = useState(1);

    const productPrice = product.price as number || 0;
    const productStock = product.stock_quantity as number || 0;

    const productCirculations = product.price_circulations;
    if (productCirculations === null) return;
    const circulatedPrices = getCirculatedPrices(productPrice, productCirculations);

    const onChangeQuantity = (inputValue: number) =>
    {

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