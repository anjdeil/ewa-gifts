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
import {spans} from "next/dist/build/webpack/plugins/profiling-plugin";

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
    console.log(images,'images');
    // console.log(transformProductColors(colors.options));

    const getSupplierOptions = (product, nameAttribyte) => {
        if (!product.attributes || !Array.isArray(product.attributes)) {
            return [];
        }

        const supplierAttribute = product.attributes.find(attr => attr.name === nameAttribyte);

        if (!supplierAttribute || !supplierAttribute.options) {
            return [];
        }

        return supplierAttribute.options.map(option => option.name);
    }

    const supplierOptions = getSupplierOptions(product, 'supplier');
    const colorOptions = getSupplierOptions(product, 'color');
    console.log(colorOptions,'colorOptions');
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
                    <Accordion defaultExpanded className={styles.accordion}>
                        <AccordionSummary
                            expandIcon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
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
                <Box className={styles['product-info__accordionWrapper']}>
                    <Accordion defaultExpanded className={styles.accordion}>
                        <AccordionSummary
                            expandIcon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
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
                        <AccordionDetails className={styles.accordion__details}>
                            <Box className={styles.accordion__item}>
                                {supplierOptions.length === 0 ? null :
                                   <>
                                       <Typography className={styles.accordion__name}>Brand</Typography>
                                       <Typography className={styles.accordion__value}>
                                           {supplierOptions.map((item) => (
                                               <span key={item}>{item}</span>
                                           ))}
                                       </Typography>
                                   </>
                                }
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
        </Box>
    )
}

export default ProductInfo;