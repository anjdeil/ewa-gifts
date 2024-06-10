import { ProductCardProps, ProductType, ProductType } from "@/types";
import { FC, useState } from "react";
import Image from "next/image";
import { RichTextComponent } from "../../Common/RichTextComponent";
import styles from './styles.module.scss';
import { ColorSlider } from "@/components/Shop/ColorSlider";
import { AddButton, Counter } from "@/components/Buttons";
import { useAppDispatch } from "@/hooks/redux";
import { updatedCartQuantity } from "@/store/reducers/CartSlice";
// import { useLazyFetchProductVariationsQuery, useFetchProductVariationsQuery } from "@/services/wooCommerceApi";

export const ProductCard: FC<ProductCardProps> = ({ product }) =>
{
    const [color, setColor] = useState('');

    const dispatch = useAppDispatch();

    function changeProductsAmount(product: ProductType, count: number)
    {
        dispatch(updatedCartQuantity({
            id: product.id,
            type: product.type,
            quantity: count,
        }));
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
                {isVariable &&
                    <ColorSlider
                        colors={product.attributes}
                        currentColor={color}
                        productId={product.id}
                        onColorClick={onHandleColorClick}
                        className={styles.productCard__colorsSlider}
                    />
                }
                {product.price_html &&
                    <div className={`desc ${styles.productCard__price}`}>
                        From <RichTextComponent text={product.price_html} />
                        <span className={styles.productCard__price_vat}>without VAT</span>
                    </div>
                }
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
                <Counter
                    count={product.quantity ? product.quantity : 1}
                    changeQuantity={(count) => changeProductsAmount(product, count)}
                />
            )}
        </div>
    );
}