import { FC } from "react";
import styles from './styles.module.scss';

interface StockProps
{
    quantity: number;
}

export const Stock: FC<StockProps> = ({ quantity }) =>
{

    const isItem = quantity > 0;

    return (
        <>

            <div className={`${styles.productCard__stock} desc`}>
                <div className={`${styles.productCard__stockCircle} ${!isItem && styles.productCard__stockCircle_empty}`}></div>
                {isItem && <span>{quantity} in shop</span>}
                {!isItem && <span>brak w magazynie</span>}
            </div>
        </>
    );
}