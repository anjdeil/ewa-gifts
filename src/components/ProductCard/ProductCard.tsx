import { ProductType } from "@/types";
import { FC, useState } from "react";
import Image from "next/image";
import { RichTextComponent } from "../RichTextComponent";
import { ColorSlider } from "../ColorSlider";
import styles from './styles.module.scss';
import { ChangeQuantityStateBtn } from "../ChangeQuantityStateBtn";
// import { useLazyFetchProductVariationsQuery, useFetchProductVariationsQuery } from "@/services/wooCommerceApi";

interface ProductCardProps
{
    product: ProductType;
}

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

    const [quantityAddingState, setQuantityAddingState] = useState(false);

    const changeQuantityState = () =>
    {
        if (!quantityAddingState)
        {
            setQuantityAddingState(true);
        }
    }

    const onHandelColorClick = async (newColor: string, productId: ProductType['id']) =>
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
            <h3 className={`desc ${styles.productCard__title}`}>
                {product.name}
            </h3>
            <div className={styles.productCard__colorsWrap}>
                {colorAttributes && <ColorSlider
                    colors={colorAttributes.options}
                    currentColor={color}
                    productId={product.id}
                    onColorClick={onHandelColorClick} />}
            </div>
            <div className={`desc ${styles.productCard__price}`}>
                From <RichTextComponent richText={product.price_html} />
                <span className={styles.productCard__price_vat}>without VAT</span>
            </div>
            {product.stock &&
                <div className={`${styles.productCard__stock} desc`}>
                    <div className={`${styles.productCard__stockCircle}`}></div>
                    <span>{product.stock} in shop</span>
                </div>}
            {
                !quantityAddingState ?
                    <ChangeQuantityStateBtn
                        onClickHandler={changeQuantityState}
                        className={styles.productCard__addBtn}
                        disabled={false}
                    />
                    :
                    <div className={styles.productCard__productCount}>
                        <button
                            className={styles.productCard__countBtn}
                            onClick={() => onCounterClick(count - 1)}
                        >
                            <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1H15" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <span className={styles.productCard__window}>{count}</span>
                        <button
                            className={styles.productCard__countBtn}
                            onClick={() => onCounterClick(count + 1)}>
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 0.833496V17.1668M1 9.00016H15" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
            }

        </div>
    )
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