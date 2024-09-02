// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import styles from './styles.module.scss';
import ProductSwiper from "@/components/Shop/ProductSwiper/ProductSwiper";
import { defaultAttributesType, ProductImagesType, ProductInfoProps, ProductOptions, variationsProductType } from "@/types";
import { ColorOptions } from "../ColorOptions";
import { SizeOptions } from "../SizeOptions";
import AccordionProduct from "@/components/Accordions/AccordionProduct/AccordionProduct";
import ProductCalculations from "../ProductCalculations";
import { transformColorsArray } from "@/services/transformers/woocommerce/transformColorsArray";
import { getDefaultVariation } from "@/Utils/getDefaultVariation";
import { filterOptionsByColorName } from "@/Utils/filterOptionsByColorName";
import { filterByColorAndSize } from "@/Utils/filterByColorAndSize";
import { filterOptionsBySize } from "@/Utils/filterOptionsBySize";
import { filterByCurrentAttr } from "@/Utils/filterByCurrentAttr";
import { findOrDefault } from "@/Utils/findOrDefault";
import { useRouter } from "next/router";
import formatPrice from "@/Utils/formatPrice";
import { transformProductSizes } from "@/types/Services/transformers/transformProductSizes";
import ProductTitling from "../ProductTitling";

const ProductInfo: FC<ProductInfoProps> = ({ product }) =>
{
    const router = useRouter();
    const isTablet = useMediaQuery('(max-width: 1024px)');
    const { name, description, price, sku, images, attributes, default_attributes, type, stock_quantity } = product;
    const [currentColor, setCurrentColor] = useState<string | null>(null);
    const [currentSize, setCurrentSize] = useState<string | null>(null);
    const [currentPrice, setCurrentPrice] = useState<number | null>(Number(price) || null);
    const [currentSku, setCurrentSku] = useState<string | null>(sku || null);
    const [currentImages, setCurrentImages] = useState<ProductImagesType[] | null>(images || null);
    const [currentVariation, setCurrentVariation] = useState<variationsProductType | null>(null);
    const [currentStock, setCurrentStock] = useState<number>(stock_quantity);
    const [sizes, setSizes] = useState<ProductOptions[] & defaultAttributesType[] | null>(null);

    const allColors = useMemo(() => transformColorsArray(attributes), [attributes]);
    const allSizes = useMemo(() => transformProductSizes(attributes), [attributes]);
    const isSimple = type === "simple";
    const { color, size } = router.query;

    useEffect(() =>
    {
        if (!default_attributes) return;

        if (allColors?.length)
        {
            const baseColor = getDefaultVariation("color", attributes, default_attributes);
            if (baseColor) setCurrentColor(baseColor);
        }

        if (allSizes?.length)
        {
            const baseSize = getDefaultVariation("size", attributes, default_attributes);
            if (baseSize) setCurrentSize(baseSize);
        }
    }, [allColors, attributes, default_attributes, allSizes]);

    useEffect(() =>
    {
        if (color) setCurrentColor(color as string);
        if (size, sizes) setCurrentSize(findOrDefault(sizes, size).option);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onColorChange(checkedColor: string): void 
    {
        setCurrentColor(checkedColor);
        // if (sizes) setCurrentSize(sizes[0].option);
    }

    function onSizeChange(checkedSize: string): void 
    {
        setCurrentSize(checkedSize);
    }

    useEffect(() =>
    {
        if (!product?.variations || !allSizes?.length) return;

        const variations = currentColor
            ? filterOptionsByColorName(product.variations, currentColor)
            : filterOptionsBySize(product.variations);
        if (variations)
        {
            setSizes(transformProductSizes(variations));
            setCurrentSize(variations[0].option);
        }
    }, [currentColor, product.variations, allSizes]);

    const getCurrentVariation = useCallback(() =>
    {
        if (currentColor && currentSize)
        {
            return filterByColorAndSize(product.variations, currentColor as string, currentSize);
        } else
        {
            const attrName = allSizes?.length ? 'size' : 'color';
            const currentAttr = allSizes?.length ? currentSize : currentColor;
            return filterByCurrentAttr(product.variations, currentAttr as string, attrName);
        }
    }, [currentColor, currentSize, allSizes, product.variations]);

    useEffect(() =>
    {
        if (!product.variations || isSimple) return;

        const currentVariation = getCurrentVariation();
        if (currentVariation && currentVariation.length > 0)
        {
            setCurrentImages(currentVariation[0].images);
            setCurrentPrice(Number(currentVariation[0].price));
            setCurrentSku(currentVariation[0].sku);
            setCurrentStock(currentVariation[0].stock_quantity);
            setCurrentVariation(currentVariation[0]);
        }
    }, [currentColor, currentSize, getCurrentVariation, isSimple, product.variations]);

    return (
        <Box className={styles.product}>
            {isTablet && <ProductTitling title={name} sku={currentSku} />}

            {currentImages &&
                <Box className={styles.product__slider}>
                    <ProductSwiper data={currentImages} />
                </Box>
            }
            <Box className={styles.product__info}>
                {!isTablet && <ProductTitling title={name} sku={currentSku} />}
                {currentPrice && <Box className={styles['price-wrapper']}>
                    <Typography variant='body2' className={styles['product-info__price']}>
                        Od {formatPrice(currentPrice)}
                        &nbsp;<span className={styles["product-info__price_vat"]}>Bez VAT</span>
                    </Typography>
                </Box>}
                {(allColors && currentColor) && <Box className={styles['color-wrapper']}>
                    <Typography variant='h3' className={styles['product-info__sku']}>
                        Dostępne kolory:
                    </Typography>
                    {(allColors && currentColor) &&
                        <ColorOptions colorAttributes={allColors} currentColor={currentColor} onColorChange={onColorChange} />}
                </Box>}
                {currentSize && <Box className={styles['size-wrapper']}>
                    <Typography variant='h3' className={styles['product-info__sku']}>
                        Wybierz rozmiar:
                    </Typography>
                    {currentSize &&
                        <SizeOptions
                            sizeAttributes={allSizes}
                            onSizeChange={onSizeChange}
                            currentSize={currentSize}
                            availableSizes={sizes}
                        />}
                </Box>}

                <div className={styles["product-info__island"]}>
                    <h3 className={`${styles['product-info__island-title']} ${styles['product-info__stock']}`}>Dostępność:</h3>
                    <span className={`${styles["product-info__stock-dot"]} ${currentStock && styles['product-info__stock-dot_active']}`}></span>
                    &nbsp;{currentStock ? `${currentStock} w magazynie` : "Brak w magazynie"}
                </div>

                <ProductCalculations product={product} variation={currentVariation} />
                <Box className={styles['product-info__accordionWrapper']}>
                    <AccordionProduct title={'OPIS PRODUKTU'} text={description} />
                    <AccordionProduct data={attributes} title={'Informacje dodatkowe'} />
                </Box>
            </Box>
        </Box>
    )
}

export default ProductInfo;