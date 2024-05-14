import { ProductType } from "@/types";
import { FC, useState } from "react";
import Image from "next/image";
import { RichTextComponent } from "../RichTextComponent";
import { ColorSlider } from "../ColorSlider";
import styles from './styles.module.scss';

interface ProductCardProps
{
    product: ProductType;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) =>
{
    const [color, setColor] = useState('');

    const colorAttributes = product.attributes[0].options ? product.attributes[0] : null;

    const onHandelColorClick = (newColor: string) =>
    {
        // alert(newColor);
        setColor(newColor);
    }

    return (
        <div className={styles.productCard}>
            <div>
                <Image
                    src={product.image}
                    alt={product.name}
                    width={220}
                    height={220}
                />
            </div>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'center', justifyContent: 'center' }}>
                From <RichTextComponent richText={product.price_html} /> without VAT
            </div>
            <h3>
                {product.name}
            </h3>
            {colorAttributes && <ColorSlider
                colors={colorAttributes.options}
                currentColor={color}
                onColorClick={onHandelColorClick} />}
        </div>
    )
}