// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import AccordionProduct from "@/components/Accordions/AccordionProduct/AccordionProduct";
import ProductSwiper from "@/components/Shop/ProductSwiper/ProductSwiper";
import { transformColorsArray } from "@/services/transformers/woocommerce/transformColorsArray";
import { defaultAttributesType, ProductImagesType, ProductInfoProps, ProductOptions, variationsProductType } from "@/types";
import { transformProductSizes } from "@/types/Services/transformers/transformProductSizes";
import { filterByColor } from "@/Utils/filterByColor";
import { filterByColorAndSize } from "@/Utils/filterByColorAndSize";
import { filterOptionsByColorName } from "@/Utils/filterOptionsByColorName";
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

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
    const router = useRouter();
    const isTablet = useMediaQuery('(max-width: 1024px)');
    const { name, description, price, sku, images, attributes, default_attributes, type, stock_quantity } = product;
    const [currentColor, setCurrentColor] = useState<string | null>(null);
    const [currentSize, setCurrentSize] = useState<string | null>(null);
    const [currentPrice, setCurrentPrice] = useState<number | null>(Number(price) || null);
    const [currentSku, setCurrentSku] = useState<string | null>(sku || null);
    const [currentImages, setCurrentImages] = useState<ProductImagesType[] | null>(images || null);
    const [currentVariation, setCurrentVariation] = useState<variationsProductType | null>(null);
    const [currentStock, setCurrentStock] = useState<number | boolean>(stock_quantity);
    const [sizes, setSizes] = useState<ProductOptions[] & defaultAttributesType[] | null>(null);


    const allColors = useMemo(() => transformColorsArray(attributes), [attributes]);
    const allSizes = useMemo(() => transformProductSizes(attributes), [attributes]);
    const isSimple = type === "simple";
    const isSized = Boolean(allSizes && allSizes.length > 0);
    const { color, size } = router.query;

    useEffect(() => {
        if (allColors && attributes && default_attributes) {
            const baseColor = getDefaultVariation("color", attributes, default_attributes);
            if (baseColor) setCurrentColor(baseColor);
        }

        if (isSized) {
            const baseSize = getDefaultVariation("size", attributes, default_attributes);
            if (baseSize) setCurrentSize(baseSize);
        }
    }, [allColors, attributes, default_attributes, isSized]);

    useEffect(() => {
        if (color) setCurrentColor(color as string);
        if (size) setCurrentSize(size as string);
    }, [color, size]);


    const onColorChange = (checkedColor: string): void => {
        setCurrentColor(checkedColor);
        if (sizes) setCurrentSize(sizes[0].option);
    };

    const onSizeChange = (checkedSize: string): void => {
        setCurrentSize(checkedSize);
    };

    useEffect(() => {
        if (!currentColor) return;

        if (product.variations) {
            const availableVariations = filterOptionsByColorName(product.variations, currentColor);
            if (availableVariations) if (isSized) setSizes(transformProductSizes(availableVariations));
        }
    }, [currentColor, product.variations, isSized]);

    const getCurrentVariation = useCallback(() => {
        if (currentSize && isSized) {
            return filterByColorAndSize(product.variations, currentColor as string, currentSize);
        } else {
            return filterByColor(product.variations, currentColor as string);
        }
    }, [currentColor, currentSize, isSized, product.variations]);

    useEffect(() => {
        if (!product.variations || isSimple || !currentColor) return;

        const currentVariation = getCurrentVariation();
        if (currentVariation && currentVariation.length > 0) {
            setCurrentImages(currentVariation[0].images);
            setCurrentPrice(Number(currentVariation[0].price));
            setCurrentSku(currentVariation[0].sku);
            setCurrentStock(currentVariation[0].stock_quantity);
            setCurrentVariation(currentVariation[0]);
        }
    }, [currentColor, currentSize, getCurrentVariation, isSimple, product.variations]);

    return (
        <Box className={styles.product}>
            {isTablet && <ProductTitling title={name} sku={currentSku} />}

            {currentImages &&
                <Box className={styles.product__slider}>
                    <ProductSwiper data={currentImages} />
                </Box>
            }
            <Box className={styles.product__info}>
                {!isTablet && <ProductTitling title={name} sku={currentSku} />}
                {currentPrice && <Box className={styles['price-wrapper']}>
                    <Typography variant='body2' className={styles['product-info__price']}>
                        Od {formatPrice(currentPrice)}
                        &nbsp;Bez VAT
                    </Typography>
                </Box>}
                {!isSimple && <Box className={styles['color-wrapper']}>
                    <Typography variant='h3' className={styles['product-info__sku']}>
                        Dostępne kolory:
                    </Typography>
                    {(allColors && currentColor) &&
                        <ColorOptions colorAttributes={allColors} currentColor={currentColor} onColorChange={onColorChange} />}
                </Box>}
                {(!isSimple && isSized) && <Box className={styles['size-wrapper']}>
                    <Typography variant='h3' className={styles['product-info__sku']}>
                        Wybierz rozmiar:
                    </Typography>
                    {isSized &&
                        <SizeOptions
                            sizeAttributes={allSizes || []}
                            onSizeChange={onSizeChange}
                            currentSize={currentSize}
                            availableSizes={sizes}
                        />}
                </Box>}

                <div className={styles["product-info__island"]}>
                    <Typography variant='h3' className={`${styles['product-info__island-title']} ${styles['product-info__stock']}`}>Dostępność:</Typography>
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