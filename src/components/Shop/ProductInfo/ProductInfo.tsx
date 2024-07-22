import React, { FC, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import styles from './styles.module.scss';
import ProductSwiper from "@/components/Shop/ProductSwiper/ProductSwiper";
import { defaultAttributesType, ProductImagesType, ProductInfoProps, ProductOptions } from "@/types";
import { ColorOptions } from "../ColorOptions";
import { SizeOptions } from "../SizeOptions";
import AccordionProduct from "@/components/Accordions/AccordionProduct/AccordionProduct";
import { transformProductSizes } from "@/Utils/transformProductSizes";
import ProductCalculations from "../ProductCalculations";
import { transformColorsArray } from "@/services/transformers/woocommerce/transformColorsArray";
import { getDefaultVariation } from "@/Utils/getDefaultVariation";
import { filterOptionsByColorName } from "@/Utils/filterOptionsByColorName";
import { filterByColorAndSize } from "@/Utils/filterByColorAndSize";
import { filterByColor } from "@/Utils/filterByColor";
import { useRouter } from "next/router";

const ProductInfo: FC<ProductInfoProps> = ({ product }) =>
{
    // console.log(product);
    const router = useRouter();
    const { name, description, price, sku, images, attributes, default_attributes, type } = product;
    const [currentColor, setCurrentColor] = useState<string | null>(null);
    const [currentSize, setCurrentSize] = useState<string | null>(null);
    const [availableVariations, setAvailableVariations] = useState<defaultAttributesType[] | null>(null);
    const [currentImages, setCurrentImages] = useState<ProductImagesType[]>(images);
    const [sizes, setSizes] = useState<ProductOptions[] & defaultAttributesType[] | null>(null);
    const allColors = transformColorsArray(attributes);
    // There is a problem with type here!
    const allSizes = transformProductSizes(attributes);
    const isSimple = type === "simple";
    const isSized = (allSizes && allSizes.length > 0) ? true : false;
    const { color, size } = router.query;

    useEffect(() =>
    {
        if (color)
        {
            console.log('Color from params', color);
        }

        if (size)
        {
            console.log('Color from params', size);
        }
    }, [color])

    useEffect(() =>
    {
        if (allColors && attributes && default_attributes)
        {
            const baseColor = getDefaultVariation("color", attributes, default_attributes);
            if (baseColor)
            {
                onColorChange(baseColor);
            }
        }

        if (isSized)
        {
            const baseSize = getDefaultVariation("size", attributes, default_attributes);
            if (baseSize)
            {
                onSizeChange(baseSize);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function onColorChange(checkedColor: string): void
    {
        setCurrentColor(checkedColor);
        if (sizes)
        {
            setCurrentSize(sizes[0].option)
        }
    }

    function onSizeChange(checkedSize: string): void
    {
        setCurrentSize(checkedSize);
    }

    useEffect(() =>
    {
        if (!currentColor)
            return;
        if (product.variations)
        {
            const availableVariations = filterOptionsByColorName(product.variations, currentColor);
            if (availableVariations)
            {
                setAvailableVariations(availableVariations);
                if (isSized)
                {
                    setSizes(transformProductSizes(availableVariations));
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentColor])

    useEffect(() =>
    {
        if (!product.variations || isSimple || !currentColor) return;
        if (currentSize && isSized)
        {
            const currentVariation = filterByColorAndSize(product.variations, currentColor, currentSize);
            if (currentVariation)
            {
                setCurrentImages(currentVariation[0].images);
            }
        } else
        {
            const currentVariation = filterByColor(product.variations, currentColor);
            if (currentVariation)
            {
                setCurrentImages(currentVariation[0].images);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentColor, currentSize])

    return (
        <Box className={styles.product}>
            <Box className={styles.product__slider}>
                <ProductSwiper data={currentImages} />
            </Box>
            <Box className={styles.product__info}>
                <Typography variant='h1' className={styles['product-info__title']} title={name}>
                    {name}
                </Typography>
                <Typography variant='caption' className={styles['product-info__sku']}>
                    {sku}
                </Typography>
                <Box className={styles['price-wrapper']}>
                    <Typography variant='body2' className={styles['product-info__price']}>
                        {price}
                    </Typography>
                </Box>
                {!isSimple && <Box className={styles['color-wrapper']}>
                    <Typography variant='h3' className={styles['product-info__sku']}>
                        Dostępne kolory:
                    </Typography>
                    {allColors && <ColorOptions colorAttributes={allColors} currentColor={currentColor} onColorChange={onColorChange} />}
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