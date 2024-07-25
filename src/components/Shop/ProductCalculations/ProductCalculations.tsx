/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from "react";
import getCirculatedPrices from "@/Utils/getCirculatedPrices";
import ProductCirculations from "../ProductCirculations";
import ProductTotals from "../ProductTotals";
import { typeProductType, variationsProductType } from "@/types";
import { CartItem } from "@/types/Cart";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import ProductButtons from "../ProductButtons";
import { updateCart } from "@/store/reducers/CartSlice";

interface ProductCalculations {
    product: typeProductType,
    variation?: variationsProductType | null
}

const ProductCalculations: FC<ProductCalculations> = ({ product, variation }) => {
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const [targetProductObject, setTargetProductObject] = useState<typeProductType | variationsProductType | undefined>();
    const [cartMatch, setCartMatch] = useState<CartItem | undefined>();
    const dispatch = useAppDispatch();
    const { items: cartItems } = useAppSelector(state => state.Cart);

    /* Set product object for circulations */
    useEffect(() => {
        if (variation) {
            setTargetProductObject(variation);
        } else {
            setTargetProductObject(product);
        }

    }, [variation]);

    /* Find and set matched cartItem */
    useEffect(() => {
        setCartMatch(cartItems.find(cartItem => {
            if (cartItem.product_id === product.id) {
                if (variation) {
                    if (variation.id === cartItem.variation_id) return true;
                } else {
                    return true;
                }
            }
        }));
    }, [variation, cartItems])

    useEffect(() => {
        if (cartMatch) {
            setCurrentQuantity(cartMatch.quantity);
        } else {
            setCurrentQuantity(1);
        }
    }, [cartMatch]);

    const productPrice = targetProductObject?.price as number || 0;
    const productStock = targetProductObject?.stock_quantity as number || 0;
    const productCirculations = targetProductObject?.price_circulations;

    if (!productCirculations) return;
    const circulatedPrices = getCirculatedPrices(productPrice, productCirculations);

    const onChangeQuantity = (inputValue: number) => {
        if (inputValue < 1) setCurrentQuantity(1);
        else if (inputValue > productStock) setCurrentQuantity(productStock);
        else setCurrentQuantity(inputValue);
    }

    const handleAddToCart = () => {
        dispatch(updateCart({
            id: product.id,
            ...(variation && { variationId: variation.id }),
            quantity: currentQuantity
        }));
    }

    const isQuantitiesMatch = () => {
        if (cartMatch)
            return currentQuantity === cartMatch.quantity;
        return false;
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
            <ProductButtons hasAdded={Boolean(cartMatch)} quantitiesMatch={isQuantitiesMatch()} onAdd={handleAddToCart} />
        </>
    )
}

export default ProductCalculations;