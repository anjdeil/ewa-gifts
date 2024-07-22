/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { VariationType, typeProductType } from "@/types";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import formatPrice from "@/Utils/formatPrice";
import { AddButton, Counter } from "@/components/Buttons";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateCart } from "@/store/reducers/CartSlice";
import { CartItem } from "@/types/Cart";
import { IconButton, Input, Radio, useMediaQuery } from "@mui/material";
import { EwaColorPickCheckedIcon, EwaColorPickIcon } from "@/components/EwaComponents/EwaColorPickIcons";
import { transformColorByName } from "@/services/transformers/woocommerce/transformColorByName";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";

interface ProductCardPropsType {
    product: typeProductType
}

type ProductInfoType = {
    image: string,
    stock: number,
    price?: number
};

export const ProductCard: FC<ProductCardPropsType> = ({ product }) => {
    const isTablet = useMediaQuery('(max-width: 1024px)');

    const colors = product.attributes.find(({ slug, variation }) => slug === "color" && variation)?.options || [];
    const sizes = product.attributes.find(({ slug, variation }) => slug === "size" && variation)?.options || [];

    const dispatch = useAppDispatch();
    const { items: cartItems } = useAppSelector(state => state.Cart);

    const [choosenColor, setColor] = useState<string | undefined>();
    const [choosenSize, setSize] = useState<string | undefined>();
    const [matchedVariationsByColor, updateMatchedVariationsByColor] = useState<VariationType[]>([]);
    const [choosenVariation, setVariation] = useState<VariationType | undefined>();
    const [productInfo, setProductInfo] = useState<ProductInfoType | undefined>();
    const [cartMatch, setCartMatch] = useState<CartItem | undefined>();

    useEffect(() => {
        setCartMatch(cartItems.find(cartItem => {
            if (cartItem.product_id === product.id) {
                if (choosenVariation) {
                    if (choosenVariation.id === cartItem.variation_id) return true;
                } else {
                    return true;
                }
            }
        }));
    }, [choosenVariation, cartItems]);

    useEffect(() => {
        if (product.type === 'variable') {
            product.attributes.forEach(({ id, slug, variation }) => {
                if (slug === 'color' && variation) {
                    setColor(product.default_attributes?.find(defaultAttribute => defaultAttribute.id === id)?.option);
                }
                if (slug === 'size' && variation) {
                    setSize(product.default_attributes?.find(defaultAttribute => defaultAttribute.id === id)?.option);
                }
            });
        }
    }, []);

    useEffect(() => {
        if (choosenVariation !== undefined) {
            setProductInfo({
                image: choosenVariation.images.length > 0 ? choosenVariation.images[0].src : "",
                stock: (typeof choosenVariation.stock_quantity === 'number') ? choosenVariation.stock_quantity : 0,
                ...((typeof choosenVariation.price === 'number') && { price: Number(choosenVariation.price) })
            });
        } else {
            setProductInfo({
                image: product.images.length > 0 ? product.images[0].src : "",
                stock: (typeof product.stock_quantity === 'number') ? product.stock_quantity : 0,
                ...((typeof product.price === 'number') && { price: Number(product.price) })
            });
        }
    }, [choosenVariation])

    useEffect(() => {
        if (choosenColor === undefined) return;

        if (product.type === 'variable') {
            setSize(undefined);
            updateMatchedVariationsByColor(product.variations.filter(variation => {
                return Boolean(variation.attributes.find(({ name, option }) => name === "color" && option === choosenColor));
            }));
        }
    }, [choosenColor]);

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
        dispatch(updateCart({
            id: product.id,
            quantity: 1,
            ...(choosenVariation && { variationId: choosenVariation.id }),
        }));
    }

    const handleChangeQuantity = (evt: ChangeEvent<HTMLInputElement>) => {
        if (!productInfo?.stock) return;

        let newQuantity = +evt.target.value;
        if (productInfo.stock < newQuantity) newQuantity = productInfo.stock;

        dispatch(updateCart({
            id: product.id,
            quantity: newQuantity,
            ...(choosenVariation && { variationId: choosenVariation.id }),
        }));
    }

    const handleIncrement = () => {
        if (cartMatch === undefined || !productInfo?.stock) return;

        let newQuantity = cartMatch.quantity + 1;
        if (productInfo.stock < newQuantity) newQuantity = productInfo.stock;

        dispatch(updateCart({
            id: product.id,
            quantity: newQuantity,
            ...(choosenVariation && { variationId: choosenVariation.id }),
        }));
    }


    const handleDecrement = () => {
        if (cartMatch === undefined) return;

        dispatch(updateCart({
            id: product.id,
            quantity: cartMatch.quantity - 1,
            ...(choosenVariation && { variationId: choosenVariation.id }),
        }));
    }

    return (
        <div className={styles["product-card"]}>
            <Link className={styles["product-card__link"]} href={`/product/${product.slug}`}>
                {productInfo?.image &&
                    <Image
                        className={styles["product-card__image"]}
                        src={productInfo?.image || ''}
                        width={isTablet ? 100 : 220}
                        height={isTablet ? 100 : 220}
                        alt={product.name}
                    />}
                <p className={styles["product-card__title"]}>
                    {product.name}
                </p>
            </Link>
            <div className={styles["product-card__calculations"]}>
                {(Boolean(colors.length)) &&
                    <div className={styles['product-card__colors']}>
                        <Swiper
                            className="color-slider"
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
                    <select name="size" onChange={handleChangeSize}>
                        <option value={choosenSize}>Choose a size</option>
                        {sizes.map(option => (
                            <option
                                key={option.slug}
                                value={option.slug}
                                disabled={!checkSizeAvailability(option.slug)}
                                selected={choosenSize === option.slug}
                            >
                                {option.name}
                            </option>
                        ))}
                    </select>
                }
            </div>
            {productInfo?.price &&
                <p className={styles["product-card__price"]}>
                    Od {formatPrice(productInfo.price)}
                    &nbsp;<span className={styles["product-card__price-ending"]}>Bez VAT</span>
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