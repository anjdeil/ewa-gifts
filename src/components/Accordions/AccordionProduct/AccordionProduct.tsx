import styles from "./styles.module.scss";
import React from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";


const AccordionProduct = ({ data, title, text }) =>
{
    const getOptions = (product, nameAttribute) =>
    {
        if (!product || !Array.isArray(product))
        {
            return [];
        }

        const supplierAttribute = product.find(attr => attr.name === nameAttribute);

        if (!supplierAttribute || !supplierAttribute.options)
        {
            return [];
        }

        return supplierAttribute.options.map(option => option.name);
    }
    const getColors = (product) =>
    {
        let colors = [];
        if (product)
        {
            product.forEach(attr =>
            {
                if (attr.name === 'color')
                {
                    attr.options.forEach(option =>
                    {

                        const cleanColors = option.name.replace(/\(#\w+\)/g, '');

                        const splitColors = cleanColors.split(',').map(color => color.trim());
                        colors = colors.concat(splitColors);
                    });
                }
            });
        }
        return colors;
    }
    const supplierOptions = getOptions(data, 'supplier');
    const sizeOptions = getOptions(data, 'size').sort((a, b) =>
    {
        const numA = parseInt(a);
        const numB = parseInt(b);
        return numA - numB;
    });
    const colorOptions = getColors(data);

    return (
        <Accordion defaultExpanded className={styles.accordion}>
            <AccordionSummary
                expandIcon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                }
                aria-controls="panel1-content"
                id="panel1-header"
                className={styles.accordion__opis}
            >
                <Typography variant='caption'>
                    {title}
                </Typography>
            </AccordionSummary>
            {text &&
                <AccordionDetails dangerouslySetInnerHTML={{ __html: text }} className={styles.accordion__description} />
            }
            {data &&
                <AccordionDetails className={styles.accordion__details}>
                    {sizeOptions.length === 0 ? null :
                        <Box className={styles.accordion__item}>
                            <Typography className={styles.accordion__name}>Rozmiar</Typography>
                            <Typography className={styles.accordion__value}>
                                {sizeOptions.map((item) => (
                                    <Typography variant='caption' key={item}>{`${item}, `}</Typography>
                                ))}
                            </Typography>
                        </Box>
                    }
                    {colorOptions.length === 0 ? null :
                        <Box className={styles.accordion__item}>
                            <Typography className={styles.accordion__name}>Kolor</Typography>
                            <Typography className={styles.accordion__value}>
                                {colorOptions.map((item) => (
                                    <Typography variant='caption' key={item}>{`${item}, `}</Typography>
                                ))}
                            </Typography>
                        </Box>
                    }
                    {supplierOptions.length === 0 ? null :
                        <Box className={styles.accordion__item}>
                            <Typography className={styles.accordion__name}>Brand</Typography>
                            <Typography className={styles.accordion__value}>
                                {supplierOptions.map((item) => (
                                    <Typography variant='caption' key={item}>{item}</Typography>
                                ))}
                            </Typography>
                        </Box>
                    }

                </AccordionDetails>
            }

        </Accordion>
    )
}
export default AccordionProduct;