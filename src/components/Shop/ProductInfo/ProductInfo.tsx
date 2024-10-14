import AccordionProduct from "@/components/Accordions/AccordionProduct/AccordionProduct";
import ProductSwiper from "@/components/Shop/ProductSwiper/ProductSwiper";
import { transformColorsArray } from "@/services/transformers/woocommerce/transformColorsArray";
import { transformProductSizes } from "@/types/Services/transformers/transformProductSizes";
import { defaultAttributesType, ProductInfoProps, ProductOptions, variationsProductType } from "@/types/Shop";
import { filterByColorAndSize } from "@/Utils/filterByColorAndSize";
import { filterByCurrentAttr } from "@/Utils/filterByCurrentAttr";
import { filterOptionsByColorName } from "@/Utils/filterOptionsByColorName";
import { filterOptionsBySize } from "@/Utils/filterOptionsBySize";
import formatPrice from "@/Utils/formatPrice";
import { getDefaultVariation } from "@/Utils/getDefaultVariation";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ColorOptions } from "../ColorOptions";
import ProductCalculations from "../ProductCalculations";
import ProductTitling from "../ProductTitling";
import { SizeOptions } from "../SizeOptions";
import styles from './styles.module.scss';
function getCurrentStockValue(simpleProductStock: number | boolean,
    variableProductStock: number | boolean | undefined): string
{
    if (simpleProductStock || variableProductStock)
        return `${variableProductStock || simpleProductStock} w magazynie`
    else
        return "Brak w magazynie"
}
const ProductInfo: FC<ProductInfoProps> = ({ product }) =>
{
    const router = useRouter();
    const { color, size } = router.query;

    const isTablet = useMediaQuery('(max-width: 768px)');
    const { name, description, price, sku, images, attributes, default_attributes, type, stock_quantity } = product;
    const [currentColor, setCurrentColor] = useState<string | null>(null);
    const [currentSize, setCurrentSize] = useState<string | null>(null);
    const [sizes, setSizes] = useState<ProductOptions[] & defaultAttributesType[] | null>(null);
    const [currentVariation, setCurrentVariation] = useState<variationsProductType | null>(null);

    const isSimple = useMemo(() => type === 'simple', [type]);
    const allColors = useMemo(() => transformColorsArray(attributes), [attributes]);
    const allSizes = useMemo(() => transformProductSizes(attributes), [attributes]);

    /** Check params and default attributes */
    useEffect(() =>
    {
        if (color || size)
            setAttributesByParams();
        else
            addDefaultAttributes();
    }, []);

    /** 
     * Change currentSize depending on currentColor
     * Updating url params
     * Set current product variation
     */
    useEffect(() =>
    {
        updateUrlParams();
        setProductVariation();
    }, [currentSize, currentColor]);

    useEffect(() =>
    {
        if (allSizes?.length && currentColor)
            setSize();
    }, [currentColor]);

    /** Get current variation depending on color and size */
    const getCurrentVariation = useCallback(() =>
    {
        if (currentColor && currentSize)
        {
            return filterByColorAndSize(product.variations, currentColor as string, currentSize);
        } else
        {
            const attrName = allSizes?.length ? 'size' : 'color';
            const currentAttr = allSizes?.length ? currentSize : currentColor;
            if (typeof (currentAttr) !== 'string') return;
            return filterByCurrentAttr(product.variations, currentAttr, attrName);
        }
    }, [allSizes?.length, currentColor, currentSize, product.variations]);

    /** Set current variation */
    const setProductVariation = useCallback(() =>
    {
        const currentVariation = getCurrentVariation();
        if (currentVariation && currentVariation.length > 0)
            setCurrentVariation(currentVariation[0]);
    }, [getCurrentVariation])

    /** Set currentColor and size by params */
    const setAttributesByParams = useCallback(() =>
    {
        if (typeof color === 'string') onColorChange(color);
        if (typeof size === 'string') onSizeChange(size);
    }, [])

    const onColorChange = useCallback((checkedColor: string): void =>
    {
        if (!checkedColor) return;
        setCurrentColor(checkedColor);
    }, []);

    const onSizeChange = useCallback((checkedSize: string): void =>
    {
        if (!checkedSize) return;
        setCurrentSize(checkedSize);
    }, []);

    /** Set currentSize depending on variations, currentColor and checkedSize */
    const setSize = useCallback(() =>
    {
        if (!product?.variations || !allSizes?.length || isSimple) return;

        let variations = []
        if (currentColor)
        {
            variations = filterOptionsByColorName(product.variations, currentColor);
        } else
        {
            variations = filterOptionsBySize(product.variations);
        }
        if (variations)
        {
            setSizes(transformProductSizes(variations));
            setCurrentSize(currentSize || variations[0].option);
        }
    }, [allSizes?.length, currentColor, isSimple, product.variations])

    const updateUrlParams = useCallback(() =>
    {
        const productPageParams = {} as { color?: string, size?: string };
        if (currentColor) productPageParams.color = currentColor;
        if (currentSize) productPageParams.size = currentSize;

        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                ...productPageParams,
            }
        }, undefined, { shallow: true });
    }, [currentColor, currentSize, router]);

    const addDefaultAttributes = useCallback(() =>
    {
        if (!default_attributes) return;

        if (allColors?.length)
        {
            const baseColor = getDefaultVariation("color", attributes, default_attributes);
            if (baseColor) setCurrentColor(baseColor);
        }

        if (allSizes?.length)
        {
            const baseSize = getDefaultVariation("size", attributes, default_attributes);
            if (baseSize) setCurrentSize(baseSize);
        }
    }, [allColors?.length, allSizes?.length, attributes, default_attributes])

    return (
        <Box className={styles.product}>
            {isTablet && (
                <>
                    <ProductTitling title={name} sku={currentVariation?.sku || sku} />
                    {currentVariation?.price || price && (
                        <Box className={styles['price-wrapper']}>
                            <Typography variant='body2' className={styles['product-info__price']}>
                                Od {formatPrice((currentVariation?.price || price))}
                                &nbsp;Bez VAT
                            </Typography>
                        </Box>
                    )}
                </>
            )}

            {(images || currentVariation?.images) &&
                <Box className={styles.product__slider}>
                    <ProductSwiper data={currentVariation?.images || images} />
                </Box>
            }
            <Box className={styles.product__info}>
                {!isTablet && (
                    <>
                        <ProductTitling title={name} sku={currentVariation?.sku || sku} />
                        {(price || currentVariation?.price) && (
                            <Box className={styles['price-wrapper']}>
                                <Typography variant='body2' className={styles['product-info__price']}>
                                    Od {formatPrice(currentVariation?.price || price)}
                                    &nbsp;Bez VAT
                                </Typography>
                            </Box>
                        )}
                    </>)}
                {(allColors && currentColor) && <Box className={styles['color-wrapper']}>
                    <Typography variant='h3' className={styles['product-info__sku']}>
                        Dostępne kolory:
                    </Typography>
                    {(allColors && currentColor) &&
                        <ColorOptions colorAttributes={allColors} currentColor={currentColor} onColorChange={onColorChange} />}
                </Box>}
                {currentSize && <Box className={styles['size-wrapper']}>
                    <Typography variant='h3' className={styles['product-info__sku']}>
                        Wybierz rozmiar:
                    </Typography>
                    <SizeOptions
                        sizeAttributes={allSizes || []}
                        onSizeChange={onSizeChange}
                        currentSize={currentSize}
                        availableSizes={sizes}
                    />
                </Box>}

                <div className={styles["product-info__island"]}>
                    <Typography variant='h3' className={`${styles['product-info__sku']} ${styles['product-info__stock']}`}>Dostępność:</Typography>
                    <span className={`${styles["product-info__stock-dot"]} ${(stock_quantity || currentVariation?.stock_quantity) && styles['product-info__stock-dot_active']}`}></span>
                    &nbsp;{getCurrentStockValue(stock_quantity, currentVariation?.stock_quantity)}
                </div>

                <ProductCalculations product={product} variation={currentVariation} />
                <Box className={styles['product-info__accordionWrapper']}>
                    <AccordionProduct title={'OPIS PRODUKTU'} text={description} />
                    <AccordionProduct data={attributes} title={'Informacje dodatkowe'} />
                </Box>
            </Box>
        </Box>
    )
}

export default ProductInfo;