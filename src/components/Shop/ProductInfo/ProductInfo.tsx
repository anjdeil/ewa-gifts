import React, { FC, useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import styles from './styles.module.scss';
import ProductSwiper from "@/components/Shop/ProductSwiper/ProductSwiper";
// import ProductCalculations from "../ProductCalculations";
import { ProductInfoProps, simpleProduct, typeProductType } from "@/types";
import { ColorOptions } from "../ColorOptions";
import { transformColors } from "@/services/transformers/woocommerce/transformColors";
import { SizeOptions } from "../SizeOptions";
import AccordionProduct from "@/components/Accordions/AccordionProduct/AccordionProduct";
import { transformProductSizes } from "@/Utils/transformProductSizes";

const ProductInfo: FC<ProductInfoProps> = ({ product }) =>
{
    const [currentColor, setCurrentColor] = useState('');

    function onColorChange(checkedColor: string): void
    {
        setCurrentColor(checkedColor);
    }

    useEffect(() =>
    {
        if (!currentColor)
            return;
        // console.log(product.variations)
        if (product.variations)
        {
            filterOptionsByName(product.variations, currentColor);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentColor])

    function filterOptionsByName(variations: simpleProduct[], name: string)
    {
        console.log(variations);
        const newArr = variations.map(variation =>
        {
            // console.log(variation.attributes);
            return variation.attributes.filter(attr => attr.name === 'color');
        })
        console.log(newArr);
    }

    const { name, description, price, sku, images, attributes } = product;
    const sizes = transformProductSizes(attributes);
    const baseColorAttr = attributes.find(attr => attr.name === "base_color");
    const colors = attributes.find(attr => attr.name === "color");
    let colorAttributes;
    if (colors)
    {
        colorAttributes = transformColors(colors.options);
    }
    let baseColor;
    if (baseColorAttr)
    {
        baseColor = transformColors(baseColorAttr.options);
    }
    // console.log('Product', product);
    // console.log('Colors', colorAttributes);
    // console.log('Sizes', sizes);

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
                    {colorAttributes && <ColorOptions colorAttributes={colorAttributes} baseColor={baseColor} onColorChange={onColorChange} />}
                </Box>
                <Box className={styles['size-wrapper']}>
                    <Typography variant='h3' className={styles['product-info__sku']}>
                        Wybierz rozmiar:
                    </Typography>
                    {sizes && <SizeOptions sizeAttributes={sizes} />}
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