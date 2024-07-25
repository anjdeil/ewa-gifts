import React, { FC } from "react";
import { EwaButton } from "@/components/EwaComponents/EwaButton";
import styles from "./styles.module.scss";
import { useAppDispatch } from "@/hooks/redux";
import { toggleMiniCart } from "@/store/reducers/CartSlice";

interface ProductButtonsPropsType {
    hasAdded?: boolean,
    quantitiesMatch?: boolean,
    onAdd: () => void
}

const ProductButtons: FC<ProductButtonsPropsType> = ({ hasAdded = false, quantitiesMatch = true, onAdd }) => {
    const dispatch = useAppDispatch();

    return (
        <div className={styles['product-buttons']}>
            {
                (hasAdded && quantitiesMatch) ?
                    <>
                        <p className="text-gray">Produkt został dodany do koszyka</p>
                        <button
                            onClick={() => { dispatch(toggleMiniCart()) }}
                            className={`desc link btn-secondary ${styles['product-buttons__secondary-button']}`}
                        >
                            Zobacz koszyk
                        </button>
                    </> :
                    <EwaButton onClick={() => onAdd()}>
                        {(hasAdded && !quantitiesMatch) ?
                            <>Aktualizuj ilość</> :
                            <>Do koszyka</>
                        }
                    </EwaButton>
            }
        </div>
    );
}

export default ProductButtons;