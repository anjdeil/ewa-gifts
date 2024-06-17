import React from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import styles from './styles.module.scss';
import ProductSwiper from "@/components/Shop/ProductSwiper/ProductSwiper";
import ProductCirculations from "../ProductCirculations";
import ProductTotals from "../ProductTotals";
import ProductCalculations from "../ProductCalculations";
// import {transformProductCard} from "@/services/transformers";


const ProductInfo = ({ data }) => {
    const [{ name, description, price, sku, images }] = data;


    return (
        <Box className={styles.product}>
            <Box className={styles.product__slider}>
                <ProductSwiper data={images} />
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

                <ProductCalculations product={data[0]} />

                <Box className={styles.product__info_accordionWrapper}>
                    <Accordion defaultExpanded className={styles.accordion}>
                        <AccordionSummary
                            expandIcon={<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 7L7 1L13 7" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
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
                                <path d="M1 7L7 1L13 7" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
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