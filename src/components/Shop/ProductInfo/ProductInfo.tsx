import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import styles from './styles.module.scss';
import ProductSwiper from "@/components/Shop/ProductSwiper/ProductSwiper";
import { defaultAttributesType, ProductImagesType, ProductInfoProps, ProductOptions } from "@/types";
import { ColorOptions } from "../ColorOptions";
import { SizeOptions } from "../SizeOptions";
import AccordionProduct from "@/components/Accordions/AccordionProduct/AccordionProduct";
import ProductCalculations from "../ProductCalculations";
import { transformColorsArray } from "@/services/transformers/woocommerce/transformColorsArray";
import { getDefaultVariation } from "@/Utils/getDefaultVariation";
import { filterOptionsByColorName } from "@/Utils/filterOptionsByColorName";
import { filterByColorAndSize } from "@/Utils/filterByColorAndSize";
import { filterByColor } from "@/Utils/filterByColor";
import { useRouter } from "next/router";
import formatPrice from "@/Utils/formatPrice";
import { transformProductSizes } from "@/types/Services/transformers/transformProductSizes";
const ProductInfo: FC<ProductInfoProps> = ({ product }) =>
{
    // console.log(product);
    const router = useRouter();
    const { name, description, price, sku, images, attributes, default_attributes, type } = product;
    const [currentColor, setCurrentColor] = useState<string | null>(null);
    const [currentSize, setCurrentSize] = useState<string | null>(null);
    const [currentPrice, setCurrentPrice] = useState<number | null>(Number(price) || null);
    const [currentSku, setCurrentSku] = useState<string | null>(sku || null);
    const [currentImages, setCurrentImages] = useState<ProductImagesType[] | null>(images || null);
    const [sizes, setSizes] = useState<ProductOptions[] & defaultAttributesType[] | null>(null);

    const allColors = useMemo(() => transformColorsArray(attributes), [attributes]);
    const allSizes = useMemo(() => transformProductSizes(attributes), [attributes]);
    const isSimple = type === "simple";
    const isSized = Boolean(allSizes && allSizes.length > 0);
    const { color, size } = router.query;

    useEffect(() =>
    {
        if (allColors && attributes && default_attributes)
        {
            const baseColor = getDefaultVariation("color", attributes, default_attributes);
            if (baseColor) setCurrentColor(baseColor);
        }

        if (isSized)
        {
            const baseSize = getDefaultVariation("size", attributes, default_attributes);
            if (baseSize) setCurrentSize(baseSize);
        }
    }, [allColors, attributes, default_attributes, isSized]);

    useEffect(() =>
    {
        if (color) setCurrentColor(color as string);
        if (size) setCurrentSize(size as string);
    }, [color, size]);


    const onColorChange = (checkedColor: string): void =>
    {
        setCurrentColor(checkedColor);
        if (sizes) setCurrentSize(sizes[0].option);
    };

    const onSizeChange = (checkedSize: string): void =>
    {
        setCurrentSize(checkedSize);
    };

    useEffect(() =>
    {
        if (!currentColor) return;

        if (product.variations)
        {
            const availableVariations = filterOptionsByColorName(product.variations, currentColor);
            if (availableVariations) if (isSized) setSizes(transformProductSizes(availableVariations));
        }
    }, [currentColor, product.variations, isSized]);

    const getCurrentVariation = useCallback(() =>
    {
        if (currentSize && isSized)
        {
            return filterByColorAndSize(product.variations, currentColor as string, currentSize);
        } else
        {
            return filterByColor(product.variations, currentColor as string);
        }
    }, [currentColor, currentSize, isSized, product.variations]);

    useEffect(() =>
    {
        if (!product.variations || isSimple || !currentColor) return;

        const currentVariation = getCurrentVariation();
        if (currentVariation && currentVariation.length > 0)
        {
            setCurrentImages(currentVariation[0].images);
            setCurrentPrice(Number(currentVariation[0].price));
            setCurrentSku(currentVariation[0].sku);
        }
    }, [currentColor, currentSize, getCurrentVariation, isSimple, product.variations]);

    return (
        <Box className={styles.product}>
            {currentImages &&
                <Box className={styles.product__slider}>
                    <ProductSwiper data={currentImages} />
                </Box>}
            <Box className={styles.product__info}>
                {name && <Typography variant='h1' className={styles['product-info__title']} title={name}>
                    {name}
                </Typography>}
                {currentSku && <Typography variant='caption' className={styles['product-info__sku']}>
                    {currentSku}
                </Typography>}
                {currentPrice && <Box className={styles['price-wrapper']}>
                    <Typography variant='body2' className={styles['product-info__price']}>
                        Od {formatPrice(currentPrice)}
                        &nbsp;<span className={styles["product-info__price_vat"]}>Bez VAT</span>
                    </Typography>
                </Box>}
                {!isSimple && <Box className={styles['color-wrapper']}>
                    <Typography variant='h3' className={styles['product-info__sku']}>
                        Dostępne kolory:
                    </Typography>
                    {(allColors && currentColor) &&
                        <ColorOptions colorAttributes={allColors} currentColor={currentColor} onColorChange={onColorChange} />}
                </Box>}
                {(!isSimple && isSized) && <Box className={styles['size-wrapper']}>
                    <Typography variant='h3' className={styles['product-info__sku']}>
                        Wybierz rozmiar:
                    </Typography>
                    {isSized &&
                        <SizeOptions
                            sizeAttributes={allSizes}
                            onSizeChange={onSizeChange}
                            currentSize={currentSize}
                            availableSizes={sizes}
                        />}
                </Box>}
                <ProductCalculations product={product} />
                <Box className={styles['product-info__accordionWrapper']}>
                    <AccordionProduct title={'OPIS PRODUKTU'} text={description} />
                    <AccordionProduct data={attributes} title={'Informacje dodatkowe'} />
                </Box>
            </Box>
        </Box>
    )
}

export default ProductInfo;