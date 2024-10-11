import AccordionProduct from "@/components/Accordions/AccordionProduct/AccordionProduct";
import ProductSwiper from "@/components/Shop/ProductSwiper/ProductSwiper";
import { transformColorsArray } from "@/services/transformers/woocommerce/transformColorsArray";
import { transformProductSizes } from "@/types/Services/transformers/transformProductSizes";
import { defaultAttributesType, ProductImagesType, ProductInfoProps, ProductOptions, variationsProductType } from "@/types/Shop";
import { filterByColorAndSize } from "@/Utils/filterByColorAndSize";
import { filterByCurrentAttr } from "@/Utils/filterByCurrentAttr";
import { filterOptionsByColorName } from "@/Utils/filterOptionsByColorName";
import { filterOptionsBySize } from "@/Utils/filterOptionsBySize";
import { findOrDefault } from "@/Utils/findOrDefault";
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

const ProductInfo: FC<ProductInfoProps> = ({ product }) =>
{
    const router = useRouter();
    const { color, size } = router.query;

    const isTablet = useMediaQuery('(max-width: 768px)');
    const { name, description, price, sku, images, attributes, default_attributes, type, stock_quantity } = product;
    const isSimple = type === "simple";
    const [currentColor, setCurrentColor] = useState<string | null>(null);
    const [currentSize, setCurrentSize] = useState<string | null>(null);
    const [currentPrice, setCurrentPrice] = useState<number | null>(Number(price) || null);
    const [currentSku, setCurrentSku] = useState<string | null>(sku || null);
    const [currentImages, setCurrentImages] = useState<ProductImagesType[] | null>(images || null);
    const [currentVariation, setCurrentVariation] = useState<variationsProductType | null>(null);
    const [currentStock, setCurrentStock] = useState<number | boolean>(stock_quantity);

    const allColors = useMemo(() => transformColorsArray(attributes), [attributes]);
    const allSizes = useMemo(() => transformProductSizes(attributes), [attributes]);
    const [sizes, setSizes] = useState<ProductOptions[] & defaultAttributesType[] | null>(null);

    useEffect(() =>
    {
        if (color || size)
            setAttributesByParams();
        else
            addDefaultAttributes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { updateUrlParams(); setProductVariation(); }, [currentSize, currentColor]);

    useEffect(() => { setProductVariation(); }, [currentColor]);

    function setProductVariation(): void
    {
        const currentVariation = getCurrentVariation();
        if (currentVariation && currentVariation.length > 0)
        {
            setCurrentImages(currentVariation[0].images);
            setCurrentPrice(Number(currentVariation[0].price));
            setCurrentSku(currentVariation[0].sku);
            setCurrentStock(currentVariation[0].stock_quantity);
            setCurrentVariation(currentVariation[0]);
        }
    }


    function setAttributesByParams(): void
    {
        if (typeof color === 'string') setColor(color);
        if (typeof size !== 'string') return;
        // if (sizes && currentColor)
        // {
        //     console.log(typeof color === 'string');
        //     const sizeVariations = filterOptionsByColorName(product.variations, currentColor);
        //     setSizes(transformProductSizes(sizeVariations));
        //     setCurrentSize(sizeVariations[0].option);
        //     return;
        // }
        // const sizeVariations = filterOptionsBySize(product.variations);
        // setSizes(transformProductSizes(sizeVariations));
        // setCurrentSize(size);
    }

    function onColorChange(checkedColor: string): void 
    {
        setColor(checkedColor);
    }

    function onSizeChange(checkedSize: string): void 
    {
        setCurrentSize(checkedSize);
    }

    function updateUrlParams(): void
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
    }

    function setColor(color: string): void
    {
        if (!color) return;
        setCurrentColor(color);

        if (!product?.variations || !allSizes?.length || isSimple || !currentColor) return;

        const variations = filterOptionsByColorName(product.variations, currentColor);
        if (variations)
        {
            setSizes(transformProductSizes(variations));
            setCurrentSize(variations[0].option);
        }
    }

    function addDefaultAttributes(): void
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
    }

    const getCurrentVariation = useCallback(() =>
    {
        if (currentColor && currentSize)
        {
            return filterByColorAndSize(product.variations, currentColor as string, currentSize);
        } else
        {
            const attrName = allSizes?.length ? 'size' : 'color';
            const currentAttr = allSizes?.length ? currentSize : currentColor;
            return filterByCurrentAttr(product.variations, currentAttr as string, attrName);
        }
    }, [currentColor, currentSize, allSizes, product.variations]);

    return (
        <Box className={styles.product}>
            {isTablet && (
                <>
                    <ProductTitling title={name} sku={currentSku} />
                    {currentPrice && (
                        <Box className={styles['price-wrapper']}>
                            <Typography variant='body2' className={styles['product-info__price']}>
                                Od {formatPrice(currentPrice)}
                                &nbsp;Bez VAT
                            </Typography>
                        </Box>
                    )}
                </>
            )}

            {currentImages &&
                <Box className={styles.product__slider}>
                    <ProductSwiper data={currentImages} />
                </Box>
            }
            <Box className={styles.product__info}>
                {!isTablet && (
                    <>
                        <ProductTitling title={name} sku={currentSku} />
                        {currentPrice && (
                            <Box className={styles['price-wrapper']}>
                                <Typography variant='body2' className={styles['product-info__price']}>
                                    Od {formatPrice(currentPrice)}
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
                    {currentSize &&
                        <SizeOptions
                            sizeAttributes={allSizes || []}
                            onSizeChange={onSizeChange}
                            currentSize={currentSize}
                            availableSizes={sizes}
                        />}
                </Box>}

                <div className={styles["product-info__island"]}>
                    <Typography variant='h3' className={`${styles['product-info__sku']} ${styles['product-info__stock']}`}>Dostępność:</Typography>
                    <span className={`${styles["product-info__stock-dot"]} ${currentStock && styles['product-info__stock-dot_active']}`}></span>
                    &nbsp;{currentStock ? `${currentStock} w magazynie` : "Brak w magazynie"}
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