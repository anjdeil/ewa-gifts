import React, { FC, useState } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import styles from './styles.module.scss';
import ProductSwiper from "@/components/Shop/ProductSwiper/ProductSwiper";
import ProductCirculations from "../ProductCirculations";
import ProductTotals from "../ProductTotals";
import ProductCalculations from "../ProductCalculations";
import { ProductInfoProps } from "@/types";
import { ColorOptions } from "../ColorOptions";
import { transformColors } from "@/services/transformers/woocommerce/transformColors";
import { SizeOptions } from "../SizeOptions";
import AccordionProduct from "@/components/Accordions/AccordionProduct/AccordionProduct";

// 46791
const ProductInfo: FC<ProductInfoProps> = ({ product }) =>
{
    console.log(product);

    const { name, description, price, sku, images, attributes } = product;
    const colors = attributes.find(attr => attr.name === "color");
    const sizes = attributes.find(attr => attr.name === "size");


    let colorAttributes;
    if (colors)
    {
        colorAttributes = transformColors(colors.options);
    }

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
                <Box>
                    <Typography variant='body2' className={styles['product-info__price']}>
                        {price}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='h3' className={styles['product-info__sku']}>
                        Dostępne kolory:
                    </Typography>
                    {colorAttributes && <ColorOptions colorAttributes={colorAttributes} />}
                </Box>
                <Box>
                    <Typography variant='h3' className={styles['product-info__sku']}>
                        Wybierz rozmiar:
                    </Typography>
                    {sizes && <SizeOptions sizeAttributes={sizes.options} />}
                </Box>

                {/* <ProductCalculations product={product} /> */}
                <Box className={styles['product-info__accordionWrapper']}>
                    <AccordionProduct text={description} title={'OPIS PRODUKTU'}/>
                </Box>
                <Box className={styles['product-info__accordionWrapper']}>
                   <AccordionProduct data={attributes} title={'Informacje dodatkowe'}/>
                </Box>
            </Box>
        </Box>
    )
}

export default ProductInfo;