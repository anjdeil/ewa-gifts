import { FC } from "react";
import styles from './styles.module.scss';

interface StockProps
{
    quantity: number | boolean;
}

export const Stock: FC<StockProps> = ({ quantity }) =>
{
    return (
        <>

            <div className={`${styles.productCard__stock} desc`}>
                <div className={`${styles.productCard__stockCircle} ${!quantity && styles.productCard__stockCircle_empty}`}></div>
                {quantity && <span>{quantity} in shop</span>}
                {!quantity && <span>brak w magazynie</span>}
            </div>
        </>
    );
}