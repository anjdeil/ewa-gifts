import React, { FC, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import styles from './styles.module.scss';
import ProductSwiper from "@/components/Shop/ProductSwiper/ProductSwiper";
// import ProductCalculations from "../ProductCalculations";
import { defaultAttributesType, ProductInfoProps, ProductOptions, simpleProduct, typeProductType } from "@/types";
import { ColorOptions } from "../ColorOptions";
import { SizeOptions } from "../SizeOptions";
import AccordionProduct from "@/components/Accordions/AccordionProduct/AccordionProduct";
import { transformProductSizes } from "@/Utils/transformProductSizes";
import ProductCalculations from "../ProductCalculations";
import { transformColorsArray } from "@/services/transformers/woocommerce/transformColorsArray";
import { transformColorByName } from "@/services/transformers/woocommerce/transformColorByName";
import { sortProductSizes } from "@/Utils/sortProductSizes";

const ProductInfo: FC<ProductInfoProps> = ({ product }) =>
{
    const { name, description, price, sku, images, attributes } = product;
    const [currentColor, setCurrentColor] = useState<string>('');
    const [availableVariations, setAvailableVariations] = useState<simpleProduct[] | null>(null);
    const [sizes, setSizes] = useState<ProductOptions[] | null>(null);
    const allColors = transformColorsArray(attributes);
    const allSizes = transformProductSizes(attributes);

    useEffect(() =>
    {
        if (allColors && allColors.length > 0)
        {
            const colorAttribute = attributes.find(attr => attr.name === "color")?.id;
            if (!colorAttribute)
                return;
            const colorId = colorAttribute;
            const defaultColorAttr = product.default_attributes.find(attr => attr.id === colorId);
            if (defaultColorAttr)
            {
                const baseColor = transformColorByName(defaultColorAttr.name);
                baseColor.slug = defaultColorAttr.option;
                console.log('Basic', baseColor);
                onColorChange(baseColor.slug);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onColorChange(checkedColor: string): void
    {
        setCurrentColor(checkedColor);
    }

    useEffect(() =>
    {
        if (!currentColor)
            return;
        if (product.variations)
        {
            filterOptionsByName(product.variations, currentColor);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentColor])

    function filterOptionsByName(variations: simpleProduct[], name: string): void
    {
        const filteredVariations: simpleProduct[] = [];
        const availableVariations: object[] = [];
        variations.forEach(variation =>
        {
            const res = variation.attributes.filter(attr => attr.name === 'color' && attr.option === name);
            if (res.length > 0)
            {
                filteredVariations.push(variation);
                const arr = transformProductSizes(variation.attributes);
                if (arr)
                {
                    availableVariations.push(arr[0]);
                }

            }
        });
    }


    useEffect(() =>
    {
        if (availableVariations)
        {
            // setSizes(transformProductSizes(attributes));
            // console.log(availableVariations);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [availableVariations])

    return (
        <Box className={styles.product}>
            <Box className={styles.product__slider}>
                <ProductSwiper data={images} />
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
                <Box className={styles['color-wrapper']}>
                    <Typography variant='h3' className={styles['product-info__sku']}>
                        Dostępne kolory:
                    </Typography>
                    {allColors && <ColorOptions colorAttributes={allColors} currentColor={currentColor} onColorChange={onColorChange} />}
                </Box>
                <Box className={styles['size-wrapper']}>
                    <Typography variant='h3' className={styles['product-info__sku']}>
                        Wybierz rozmiar:
                    </Typography>
                    {allSizes && <SizeOptions sizeAttributes={allSizes} />}
                </Box>

                {/* <ProductCalculations product={product} /> */}
                <Box className={styles['product-info__accordionWrapper']}>
                    <AccordionProduct data={attributes} title={'Informacje dodatkowe'} />
                </Box>
            </Box>
        </Box>
    )
}

export default ProductInfo;