import { FC, useState } from "react";
import Image from "next/image";
import { RichTextComponent } from "../../Common/RichTextComponent";
import styles from './styles.module.scss';
import { ColorSlider } from "@/components/Shop/ColorSlider";
import { AddButton, Counter } from "@/components/Buttons";
import { useAppDispatch } from "@/hooks/redux";
import { updatedCartQuantity } from "@/store/reducers/CartSlice";
import { ProductCardProps, typeProductType } from "@/types";
import { Stock } from "./Stock";
import Link from "next/link";
import { transformColorsArray } from "@/services/transformers/woocommerce/transformColorsArray";
import { Box } from "@mui/material";

export const ProductCard: FC<ProductCardProps> = ({ product }) =>
{
    const [inputId, setInputId] = useState<string>('');
    const [isVariable, setVariable] = useState(false);
    const [count, setCount] = useState<number>(0);
    const dispatch = useAppDispatch();
    if (!product) return;

    let colors;
    if (product.type === "variable")
        colors = transformColorsArray(product.attributes);

    function changeProductsAmount(product: typeProductType, count: number)
    {
        dispatch(updatedCartQuantity({
            id: product.id,
            type: product.type,
            quantity: count,
        }));
        setCount(0);
    }

    const changeQuantityState = () =>
    {
        if (!isVariable)
        {
            setVariable(true);
        }
    }

    const onInputClick = (id: string) =>
    {
        setInputId(id);
    };

    return (
        <Box className={styles.productCard}>
            <Link href={`/product/${product.slug}`}>
                <Box className={styles.productCard__image}>
                    <Image
                        src={product.images[0]?.src}
                        alt={product.name}
                        width={220}
                        height={220}
                    />
                </Box>
                <h3 className={`desc ${styles.productCard__title}`}>
                    {product.name}
                </h3>
            </Link>
            <Box className={styles.productCard__content}>
                {colors &&
                    <ColorSlider
                        colors={colors}
                        currentColor={inputId}
                        productId={product.id}
                        onColorClick={onInputClick}
                        className={styles.productCard__colorsSlider}
                    />
                }
                {product.price &&
                    <Box className={`desc ${styles.productCard__price}`}>
                        From <RichTextComponent text={product.price.toString()} />
                        <span className={styles.productCard__price_vat}>without VAT</span>
                    </Box>
                }
                <Stock quantity={product.stock_quantity} />
            </Box>
            {!isVariable ? (
                <AddButton
                    onClickHandler={changeQuantityState}
                    className={styles.productCard__addBtn}
                    disabled={false}
                />
            ) : (
                <Counter
                    count={count}
                    changeQuantity={(count) => changeProductsAmount(product, count)}
                />
            )}
        </Box>
    );
}