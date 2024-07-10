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
// import { useLazyFetchProductVariationsQuery, useFetchProductVariationsQuery } from "@/services/wooCommerceApi";

export const ProductCard: FC<ProductCardProps> = ({ product }) =>
{
    const [color, setColor] = useState('');
    const [isVariable, setVariable] = useState(false);
    const [count, setCount] = useState(0);
    const dispatch = useAppDispatch();
    if (!product) return;

    function changeProductsAmount(product: typeProductType, count: number)
    {
        dispatch(updatedCartQuantity({
            id: product.id,
            type: product.type,
            quantity: count,
        }));
    }

    const changeQuantityState = () =>
    {
        if (!isVariable)
        {
            setVariable(true);
        }
    }

    const onHandleColorClick = async (newColor: string) =>
    {
        setColor(newColor);
    }

    return (
        <Link href={`/product/${product.slug}`} className={styles.productCard}>
            <div className={styles.productCard__image}>
                {/* <Image
                    src={product.images[0]?.src}
                    alt={product.name}
                    width={220}
                    height={220}
                /> */}
            </div>
            <div className={styles.productCard__content}>
                <h3 className={`desc ${styles.productCard__title}`}>
                    {product.name}
                </h3>
                {isVariable &&
                    <ColorSlider
                        colors={product.attributes}
                        currentColor={color}
                        productId={product.id}
                        onColorClick={onHandleColorClick}
                        className={styles.productCard__colorsSlider}
                    />
                }
                {product.price &&
                    <div className={`desc ${styles.productCard__price}`}>
                        From <RichTextComponent text={product.price.toString()} />
                        <span className={styles.productCard__price_vat}>without VAT</span>
                    </div>
                }
                <Stock quantity={product.stock_quantity} />
            </div>
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
        </Link>
    );
}