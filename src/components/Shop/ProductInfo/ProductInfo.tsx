import React from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './styles.module.scss';
import ProductSwiper from "@/components/Shop/ProductSwiper/ProductSwiper";
import ProductCirculations from "../ProductCirculations";
import ProductTotals from "../ProductTotals";
import ProductCalculations from "../ProductCalculations";
// import {transformProductCard} from "@/services/transformers";


const ProductInfo = ({ data }) => {
    const [{ name, description, price, sku, images }] = data;
    console.log(data);
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
                            expandIcon={<ExpandMoreIcon />}
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
                            expandIcon={<ExpandMoreIcon />}
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