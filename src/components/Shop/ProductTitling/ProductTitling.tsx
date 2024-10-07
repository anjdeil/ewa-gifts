import { FC } from "react";
import styles from './styles.module.scss';

interface ProductTitlingPropsType {
    title: string,
    sku: string | null
}

const ProductTitling: FC<ProductTitlingPropsType> = ({ title, sku }) => {
    return (
        <div>
            {title &&
                <h1 className={`secondary-title ${styles.productTitling}`}>
                    {title}
                </h1>
            }
            {sku &&
                <p className={`text-gray ${styles.productSku}`}>
                    {sku}
                </p>}
        </div>
    );
}

export default ProductTitling;