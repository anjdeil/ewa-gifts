import styles from "./styles.module.scss";
import React from "react";
import {Box, Typography, Accordion, AccordionSummary, AccordionDetails} from "@mui/material";


const AccordionProduct = ({data, title, text}) => {
    const getSupplierOptions = (product, nameAttribyte) => {
        if (!product || !Array.isArray(product)) {
            return [];
        }

        const supplierAttribute = product.find(attr => attr.name === nameAttribyte);

        if (!supplierAttribute || !supplierAttribute.options) {
            return [];
        }

        return supplierAttribute.options.map(option => option.name);
    }
    const getColors = (product) => {
        let colors = [];
        if (product) {
            product.forEach(attr => {
                if (attr.name === 'color') {
                    attr.options.forEach(option => {
                        // Видаляємо хеш-коди кольорів за допомогою регулярного виразу
                        const cleanColors = option.name.replace(/\(#\w+\)/g, '');
                        // Розділяємо рядок за комами та видаляємо пробіли
                        const splitColors = cleanColors.split(',').map(color => color.trim());
                        colors = colors.concat(splitColors);
                    });
                }
            });
        }
        return colors;
    }
    const supplierOptions = getSupplierOptions(data, 'supplier');
    const colorOptions = getColors(data);



    console.log(colorOptions);
    return (
        <Accordion defaultExpanded className={styles.accordion}>
            <AccordionSummary
                expandIcon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
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
				<AccordionDetails dangerouslySetInnerHTML={{__html: text}} className={styles.accordion__description}/>
            }
            {data &&
				<AccordionDetails className={styles.accordion__details}>

                    {colorOptions.length === 0 ? null :
                        <Box className={styles.accordion__item}>
                            <Typography className={styles.accordion__name}>Color</Typography>
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