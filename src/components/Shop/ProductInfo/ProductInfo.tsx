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

// 46791
const ProductInfo: FC<ProductInfoProps> = ({ product }) =>
{
    console.log(product);

    const { name, description, price, sku, images, attributes } = product;
    const colors = attributes.find(attr => attr.name === "color");
    const sizes = attributes.find(attr => attr.name === "size");
    // const [currentProduct, setCurrentProduct] = useState(
    //     {
    //     });

    let colorAttributes;
    if (colors)
    {
        colorAttributes = transformColors(colors.options);
    }
    console.log(product);
    // console.log(transformProductColors(colors.options));

    return (
        <Box className={styles.product}>
            <Box className={styles.product__slider}>
                {/* <ProductSwiper data={images} /> */}
            </Box>
            <Box className={styles.product__info}>
                <Typography variant='h1' className={styles.product__info_title} title={name}>
                    {name}
                </Typography>
                <Typography variant='caption' className={styles.product__info_sku}>
                    {sku}
                </Typography>
                <Box>
                    <Typography variant='body2' className={styles.product__info_price}>
                        {price}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='h3' className={styles.product__info_sku}>
                        Dostępne kolory:
                    </Typography>
                    {colorAttributes && <ColorOptions colorAttributes={colorAttributes} />}
                </Box>
                <Box>
                    <Typography variant='h3' className={styles.product__info_sku}>
                        Wybierz rozmiar:
                    </Typography>
                    {sizes && <SizeOptions sizeAttributes={sizes.options} />}
                </Box>

                {/* <ProductCalculations product={product} /> */}
                <Box className={styles.product__info_accordionWrapper}>
                    <Accordion defaultExpanded className={styles.accordion}>
                        <AccordionSummary
                            expandIcon={<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 7L7 1L13 7" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            }
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className={styles.accordion__opis}
                        >
                            <Typography variant='caption'>
                                OPIS PRODUKTU
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails dangerouslySetInnerHTML={{ __html: description }}
                            className={styles.accordion__description} />
                    </Accordion>
                </Box>
                <Box className={styles.product__info_accordionWrapper}>
                    <Accordion defaultExpanded className={styles.accordion}>
                        <AccordionSummary
                            expandIcon={<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 7L7 1L13 7" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            }
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className={styles.accordion__opis}
                        >
                            <Typography variant='caption'>
                                Informacje dodatkowe
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails dangerouslySetInnerHTML={{ __html: description }}
                            className={styles.accordion__description} />
                    </Accordion>
                </Box>
            </Box>
        </Box>
    )
}

export default ProductInfo;