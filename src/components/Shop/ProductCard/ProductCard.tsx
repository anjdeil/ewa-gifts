import { ProductCardProps, ProductType } from "@/types";
import { FC, useState } from "react";
import Image from "next/image";
import { RichTextComponent } from "../../Common/RichTextComponent";
import styles from './styles.module.scss';
import { ColorSlider } from "@/components/Shop/ColorSlider";
import { AddButton, Counter } from "@/components/Buttons";
// import { useLazyFetchProductVariationsQuery, useFetchProductVariationsQuery } from "@/services/wooCommerceApi";

export const ProductCard: FC<ProductCardProps> = ({ product }) =>
{
    const [color, setColor] = useState('');

    const colorAttributes = product.attributes[0].options ? product.attributes[0] : null;

    const [count, setCount] = useState(1);

    const onCounterClick = (count: number) =>
    {
        if (count >= 1)
        {
            setCount(count);
        }
    }

    const [isVariable, setVariable] = useState(false);

    const changeQuantityState = () =>
    {
        if (!isVariable)
        {
            setVariable(true);
        }
    }

    const onHandleColorClick = async (newColor: string, productId: ProductType['id']) =>
    {
        setColor(newColor);
        console.log(productId);
    }

    return (
        <div className={styles.productCard}>
            <div className={styles.productCard__image}>
                <Image
                    src={product.image}
                    alt={product.name}
                    width={220}
                    height={220}
                />
            </div>
            <div className={styles.productCard__content}>
                <h3 className={`desc ${styles.productCard__title}`}>
                    {product.name}
                </h3>
                {colorAttributes && (
                    <ColorSlider
                        colors={colorAttributes.options}
                        currentColor={color}
                        productId={product.id}
                        onColorClick={onHandleColorClick}
                        className={styles.productCard__colorsSlider}
                    />
                )}
                <div className={`desc ${styles.productCard__price}`}>
                    From <RichTextComponent richText={product.price_html} />
                    <span className={styles.productCard__price_vat}>without VAT</span>
                </div>
                {product.stock && (
                    <div className={`${styles.productCard__stock} desc`}>
                        <div className={styles.productCard__stockCircle}></div>
                        <span>{product.stock} in shop</span>
                    </div>
                )}

            </div>
            {!isVariable ? (
                <AddButton
                    onClickHandler={changeQuantityState}
                    className={styles.productCard__addBtn}
                    disabled={false}
                />
            ) : (
                <Counter onClickHandler={onCounterClick} count={count} />
            )}
        </div>
    );
}

// const [fetchProductVariations, { isLoading, data, error }] = useLazyFetchProductVariationsQuery();
// const result = await fetchProductVariations(productId);

// if (result.data)
// {
//     console.log(result.data);
// } else
// {
//     console.log('No data received');
// }

// products/22127/variations

// const { isLoading, data, error } = useFetchProductVariationsQuery(22127);

// if (data)
// {
//     console.log(data);
// }

// alert(productId);