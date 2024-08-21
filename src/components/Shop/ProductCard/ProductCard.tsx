import { variationsProductType, typeProductType } from "@/types/Shop";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import formatPrice from "@/Utils/formatPrice";
import { AddButton } from "@/components/Buttons";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateCart } from "@/store/reducers/CartSlice";
import { CartItem } from "@/types/Cart";
import { IconButton, Input, Radio, useMediaQuery } from "@mui/material";
import { EwaColorPickCheckedIcon, EwaColorPickIcon } from "@/components/EwaComponents/EwaColorPickIcons";
import { transformColorByName } from "@/services/transformers/woocommerce/transformColorByName";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useSearchParams } from "next/navigation";
import getCirculatedPrices, { CirculatedPriceType } from "@/Utils/getCirculatedPrices";
import getCirculatedPrice from "@/Utils/getCirculatedPrice";

interface ProductCardPropsType {
    product: typeProductType,
}

type ProductInfoType = {
    image: string,
    stock: number,
    sku: string,
    price?: number,
    priceСirculations?: {
        type: string,
        circulations: {
            [key: number]: number;
        }
    }
};

export const ProductCard: FC<ProductCardPropsType> = ({ product }) => {
    const isTablet = useMediaQuery('(max-width: 1024px)');

    const searchParams = useSearchParams();
    const baseColor = searchParams.get('pa_base_color');

    const colors = product.attributes.find(({ slug, variation }) => slug === "color" && variation)?.options || [];
    const sizes = product.attributes.find(({ slug, variation }) => slug === "size" && variation)?.options || [];

    const dispatch = useAppDispatch();
    const { items: cartItems } = useAppSelector(state => state.Cart);

    const [choosenColor, setColor] = useState<string | undefined>();
    const [choosenSize, setSize] = useState<string | undefined>();
    const [matchedVariationsByColor, updateMatchedVariationsByColor] = useState<variationsProductType[]>([]);
    const [choosenVariation, setVariation] = useState<variationsProductType | undefined>();
    const [productInfo, setProductInfo] = useState<ProductInfoType | undefined>();
    const [cartMatch, setCartMatch] = useState<CartItem | undefined>();
    const supplier = product?.attributes?.find(({ name }) => name === 'supplier')?.options[0].slug;
    const [circulatedPrices, setCirculatedPrices] = useState<CirculatedPriceType[] | undefined>();

    useEffect(() => {
        if (productInfo?.priceСirculations && productInfo?.price) {
            setCirculatedPrices(
                getCirculatedPrices(productInfo.price, productInfo.priceСirculations)
            );
        }
    }, [productInfo]);

    /* Finding relevant product and variation from CartItems */
    useEffect(() => {
        setCartMatch(cartItems.find((cartItem: CartItem) => {
            if (cartItem.product_id === product.id) {
                if (choosenVariation) {
                    if (choosenVariation.id === cartItem.variation_id) return true;
                } else {
                    return true;
                }
            }
        }));
    }, [choosenVariation, cartItems]);

    /* Set default options */
    useEffect(() => {
        if (product.type === 'variable') {
            product.attributes.forEach(({ id, slug, variation }) => {
                if (baseColor) {
                    if (slug === 'base_color' && variation) {
                        const baseColorSplit = baseColor.split('-');

                        const matchedVariation = product?.variations?.find(({ attributes }) => {

                            return attributes.some(({ name, option }) => {
                                if (name === "base_color") {
                                    const colorSplit = option.split('-');
                                    return colorSplit.some(color => baseColorSplit.includes(color))

                                }
                            });
                        });

                        if (matchedVariation !== undefined) {
                            setColor(matchedVariation.attributes.find(({ name }) => name == "color")?.option);
                        }
                    }
                } else {
                    if (slug === 'color' && variation) {
                        setColor(product.default_attributes?.find(defaultAttribute => defaultAttribute.id === id)?.option);
                    }
                }
                if (slug === 'size' && variation) {
                    setSize(product.default_attributes?.find(defaultAttribute => defaultAttribute.id === id)?.option);
                }
            });
        }
    }, [baseColor]);


    /* Finding: Image, Price, Stock - from current variation or product */
    useEffect(() => {
        if (choosenVariation !== undefined) {
            setProductInfo({
                image: choosenVariation.images.length > 0 ? choosenVariation.images[0].src : "",
                stock: (typeof choosenVariation.stock_quantity === 'number') ? choosenVariation.stock_quantity : 0,
                sku: choosenVariation.sku,
                ...((typeof choosenVariation.price === 'number') && { price: Number(choosenVariation.price) }),
                ...(choosenVariation?.price_circulations && { priceСirculations: choosenVariation.price_circulations })
            });
        } else {
            setProductInfo({
                image: product.images.length > 0 ? product.images[0].src : "",
                stock: (typeof product.stock_quantity === 'number') ? product.stock_quantity : 0,
                sku: product.sku,
                ...((typeof product.price === 'number') && { price: Number(product.price) }),
                ...(product?.price_circulations && { priceСirculations: product.price_circulations })
            });
        }
    }, [choosenVariation])

    /* Finding matched variations by color */
    useEffect(() => {
        if (choosenColor === undefined) return;

        if (product.type === 'variable') {
            setSize(undefined);
            updateMatchedVariationsByColor(product.variations.filter(variation => {
                return Boolean(variation.attributes.find(({ name, option }) => name === "color" && option === choosenColor));
            }));
        }
    }, [choosenColor]);

    /* Seting matched variation by picked size */
    useEffect(() => {
        if (choosenSize === undefined) return;

        if (colors.length > 0) {
            if (matchedVariationsByColor.length > 0) {
                setVariation(matchedVariationsByColor.find(variation => {
                    return variation.attributes.some(({ option }) => option === choosenSize);
                }));
            }
        } else {
            setVariation(product.variations.find(variation => {
                return variation.attributes.some(({ option }) => option === choosenSize);
            }));
        }

    }, [choosenSize]);

    /* Set first matched variation as choosen */
    useEffect(() => {
        if (matchedVariationsByColor.length > 0) {
            setVariation(matchedVariationsByColor[0]);
        }
    }, [matchedVariationsByColor]);

    const handleChangeColor = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setColor(event.target.value);
    }

    const handleChangeSize = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setSize(event.target.value);
    }

    const checkSizeAvailability = (sizeOption: string): boolean => {
        if (colors.length <= 0) return true;

        return matchedVariationsByColor.some(variation => {
            return variation.attributes.some(({ option }) => option === sizeOption);
        });
    }

    const handleAddToCart = () => {
        if (!productInfo?.stock) return;

        const circulatedPrice = circulatedPrices && getCirculatedPrice(1, circulatedPrices);
        const total = circulatedPrice && circulatedPrice * 1;

        dispatch(updateCart({
            id: product.id,
            quantity: 1,
            ...(supplier && { supplier }),
            ...(choosenVariation && { variationId: choosenVariation.id }),
            ...(total && { total: String(total) })
        }));
    }

    const handleChangeQuantity = (evt: ChangeEvent<HTMLInputElement>) => {
        if (!productInfo?.stock) return;

        let newQuantity = +evt.target.value;
        if (productInfo.stock < newQuantity) newQuantity = productInfo.stock;

        const circulatedPrice = circulatedPrices && getCirculatedPrice(newQuantity, circulatedPrices);
        const total = circulatedPrice && circulatedPrice * newQuantity;

        dispatch(updateCart({
            id: product.id,
            quantity: newQuantity,
            ...(supplier && { supplier }),
            ...(choosenVariation && { variationId: choosenVariation.id }),
            ...(total && { total: String(total) })
        }));
    }

    const handleIncrement = () => {
        if (cartMatch === undefined || !productInfo?.stock) return;

        let newQuantity = cartMatch.quantity + 1;
        if (productInfo.stock < newQuantity) newQuantity = productInfo.stock;

        const circulatedPrice = circulatedPrices && getCirculatedPrice(newQuantity, circulatedPrices);
        const total = circulatedPrice && circulatedPrice * newQuantity;

        dispatch(updateCart({
            id: product.id,
            quantity: newQuantity,
            ...(supplier && { supplier }),
            ...(choosenVariation && { variationId: choosenVariation.id }),
            ...(total && { total: String(total) })
        }));
    }

    const handleDecrement = () => {
        if (cartMatch === undefined) return;
        const newQuantity = cartMatch.quantity - 1;

        const circulatedPrice = circulatedPrices && getCirculatedPrice(newQuantity, circulatedPrices);
        const total = circulatedPrice && circulatedPrice * newQuantity;

        dispatch(updateCart({
            id: product.id,
            quantity: newQuantity,
            ...(supplier && { supplier }),
            ...(choosenVariation && { variationId: choosenVariation.id }),
            ...(total && { total: String(total) })
        }));
    }

    const checkIsSizeChecked = (size: string) => {
        if (choosenVariation === undefined) return false;

        return choosenVariation.attributes.some(({ name, option }) => {
            if (name === 'size' && option === size) return true;
        });
    }

    /* Generate link to the product page */
    const productPageBase = `/product/${product.slug}`;
    const productPageParams = [];
    if (choosenColor) productPageParams.push(`color=${choosenColor}`);
    if (choosenSize) productPageParams.push(`size=${choosenSize}`);

    const productPageLink = productPageParams.reduce((link, param, index) => {
        return `${link}${index === 0 ? "?" : "&"}${param}`;
    }, productPageBase);

    return (
        <div className={styles["product-card"]}>
            <Link className={styles["product-card__link"]} href={productPageLink}>
                {productInfo?.image &&
                    <Image
                        className={styles["product-card__image"]}
                        src={productInfo?.image || ''}
                        width={isTablet ? 100 : 220}
                        height={isTablet ? 100 : 220}
                        alt={product.name}
                        unoptimized={true}
                    />}
                <p className={styles["product-card__title"]}>
                    {product.name}
                </p>
            </Link>
            {productInfo?.sku &&
                <p className={styles["product-card__sku"]}>
                    {productInfo.sku}
                </p>
            }
            <div className={styles["product-card__calculations"]}>
                {(Boolean(colors.length)) &&
                    <div className={styles['product-card__colors']}>
                        <Swiper
                            className="product-card-slider"
                            slidesPerView={isTablet ? 3 : 6}
                            spaceBetween={0}
                            modules={[Navigation]}
                            navigation={true}
                        >
                            {colors.map(color => {
                                const { label, cssColor } = transformColorByName(color.name);
                                return (
                                    <SwiperSlide key={color.slug} className={styles["product-card__color-slider-slide"]}>
                                        <Radio
                                            onChange={handleChangeColor}
                                            checked={choosenColor === color.slug}
                                            inputProps={{ 'aria-label': label }}
                                            value={color.slug}
                                            icon={<EwaColorPickIcon color={cssColor} />}
                                            checkedIcon={<EwaColorPickCheckedIcon color={cssColor} />}
                                        />
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                }
                {(Boolean(sizes.length)) &&
                    <div className={`size-picks ${styles['product-card__sizes']}`}>
                        {sizes.map(option => (
                            <label key={option.slug} className="size-pick">
                                <input
                                    className="size-pick__input"
                                    type="radio"
                                    value={option.slug}
                                    disabled={!checkSizeAvailability(option.slug)}
                                    checked={checkIsSizeChecked(option.slug)}
                                    onChange={handleChangeSize}
                                />
                                <div className="size-pick__island">{option.name}</div>

                            </label>
                        ))}
                    </div>
                }
            </div>
            {productInfo?.price &&
                <p className={"product-price"}>
                    Od {formatPrice(productInfo.price)}
                    &nbsp;<span className={"product-price-ending"}>Bez VAT</span>
                </p>
            }
            <p className={styles["product-card__stock"]}>
                <span className={`${styles["product-card__stock-dot"]} ${productInfo?.stock && styles['product-card__stock-dot_active']}`}></span>
                &nbsp;{productInfo?.stock ? productInfo.stock : "Brak w magazynie"}
            </p>

            <div className={styles["product-card__swatches"]}>
                {!cartMatch ?
                    <AddButton
                        onClickHandler={handleAddToCart}
                        className={styles["product-card__button"]}
                        disabled={!productInfo?.price || !productInfo?.stock}
                    /> :
                    <div className={styles.counter}>
                        <IconButton aria-hidden size="large" aria-label="Minus" onClick={handleDecrement} >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </IconButton>
                        <Input
                            value={cartMatch.quantity}
                            onChange={handleChangeQuantity}
                            className={styles.counter__window}
                            type="number"
                        />
                        <IconButton size="large" aria-label="Plus" onClick={handleIncrement} >
                            <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19M5 12H19" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </IconButton>
                    </div>
                }
            </div>
        </div>
    );
}
